"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { RELAYS } from "@/lib/nostr";
import type { NostrEvent } from "@/types/nostr";

interface RelaySocket extends WebSocket {
  relayUrl: string;
  _subs: Record<string, (ev: NostrEvent) => void>;
  _eose: Record<string, () => void>;
}

let subIdCounter = 0;
function newSubId(prefix: string) {
  return prefix + "_" + ++subIdCounter;
}

function connectRelay(url: string): Promise<RelaySocket | null> {
  return new Promise((resolve) => {
    try {
      const ws = new WebSocket(url) as RelaySocket;
      ws.relayUrl = url;
      ws._subs = {};
      ws._eose = {};
      ws.onopen = () => resolve(ws);
      ws.onerror = () => resolve(null);
      ws.onclose = () => {};
      ws.onmessage = (e) => {
        try {
          const msg = JSON.parse(e.data);
          if (msg[0] === "EVENT" && msg[2]) {
            const subId = msg[1];
            if (ws._subs[subId]) ws._subs[subId](msg[2]);
          }
          if (msg[0] === "EOSE") {
            const subId = msg[1];
            if (ws._eose[subId]) {
              ws._eose[subId]();
              delete ws._eose[subId];
            }
          }
        } catch {
          // ignore parse errors
        }
      };
      setTimeout(() => resolve(null), 5000);
    } catch {
      resolve(null);
    }
  });
}

export function useNostrPool() {
  const socketsRef = useRef<RelaySocket[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function connect() {
      const results = await Promise.all(RELAYS.map(connectRelay));
      if (cancelled) {
        results.filter(Boolean).forEach((ws) => ws?.close());
        return;
      }
      socketsRef.current = results.filter(Boolean) as RelaySocket[];
      setConnected(socketsRef.current.length > 0);
    }

    connect();

    return () => {
      cancelled = true;
      socketsRef.current.forEach((ws) => {
        try {
          ws.close();
        } catch {
          // ignore
        }
      });
      socketsRef.current = [];
    };
  }, []);

  const subscribe = useCallback(
    (
      filter: Record<string, unknown>,
      onEvent: (ev: NostrEvent) => void
    ): Promise<void[]> => {
      const promises = socketsRef.current.map((ws) => {
        const id = newSubId("s");
        ws._subs[id] = onEvent;
        ws.send(JSON.stringify(["REQ", id, filter]));
        return new Promise<void>((resolve) => {
          ws._eose[id] = resolve;
          setTimeout(resolve, 8000);
        });
      });
      return Promise.all(promises);
    },
    []
  );

  const subscribePersistent = useCallback(
    (
      filter: Record<string, unknown>,
      onEvent: (ev: NostrEvent) => void
    ) => {
      socketsRef.current.forEach((ws) => {
        const id = newSubId("live");
        ws._subs[id] = onEvent;
        ws.send(JSON.stringify(["REQ", id, filter]));
      });
    },
    []
  );

  return { sockets: socketsRef, connected, subscribe, subscribePersistent };
}
