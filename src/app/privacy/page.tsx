import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Wisp",
  description: "Privacy policy for Wisp, the Android Nostr client.",
};

export default function PrivacyPage() {
  return (
    <>
      <nav className="flex items-center justify-between border-b border-[#1a1a1a] px-8 py-5">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="gradient-text">wisp</span>
        </Link>
      </nav>

      <div className="mx-auto max-w-[720px] px-8 pt-16 pb-24">
        <h1 className="mb-2 text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mb-12 text-sm text-[#888]">Last updated: February 28, 2026</p>

        <div className="space-y-0 text-[15px] leading-relaxed text-[#888] [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[#f0f0f0] [&_strong]:text-[#f0f0f0] [&_strong]:font-semibold [&_a]:text-[#f97316] [&_a:hover]:underline [&_ul]:mb-4 [&_ul]:pl-5 [&_ul]:list-disc [&_li]:mb-2 [&_p]:mb-4">
          <p>
            Wisp (&quot;we&quot;, &quot;our&quot;, &quot;the app&quot;) is an open-source Android client for the Nostr protocol. We are committed to protecting your privacy. This policy explains what data the app handles, how it is used, and your rights.
          </p>

          <h2>Summary</h2>
          <p>
            <strong>We do not collect, store, track, or share any personal data.</strong> Wisp has no servers, no analytics, no telemetry, and no third-party tracking services. The entire source code is open and auditable at{" "}
            <a href="https://github.com/barrydeen/wisp" target="_blank" rel="noopener noreferrer">github.com/barrydeen/wisp</a>.
          </p>

          <h2>Data Collection</h2>
          <p>Wisp does <strong>not</strong> collect any data. Specifically:</p>
          <ul>
            <li>We do not collect personal information (name, email, phone number, etc.)</li>
            <li>We do not collect device identifiers or hardware information</li>
            <li>We do not collect location data</li>
            <li>We do not collect usage analytics or crash reports</li>
            <li>We do not use cookies, pixels, or any tracking technology</li>
            <li>We do not use any third-party analytics, advertising, or data processing services</li>
          </ul>

          <h2>How Wisp Works</h2>
          <p>Wisp connects directly to Nostr relays — decentralized servers that are part of the open Nostr protocol. When you use Wisp:</p>
          <ul>
            <li><strong>Your cryptographic keys</strong> are generated and stored locally on your device. They never leave your device unless you explicitly export them.</li>
            <li><strong>Notes and messages</strong> you publish are sent directly from your device to the Nostr relays you are connected to. This is part of the open Nostr protocol and is not controlled by Wisp.</li>
            <li><strong>Content you view</strong> is fetched directly from Nostr relays to your device.</li>
            <li><strong>Private messages</strong> (NIP-17) are end-to-end encrypted between you and the recipient.</li>
          </ul>

          <h2>Nostr Wallet Connect (NWC)</h2>
          <p>
            Wisp supports Nostr Wallet Connect for sending and receiving Lightning payments (zaps). Wallet connection strings are stored locally on your device. Wisp does not have access to your wallet funds and does not process, store, or transmit any financial data through our own infrastructure — all wallet communication occurs directly between your device and your chosen wallet provider via the NWC protocol.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            Wisp does <strong>not</strong> integrate any third-party services for data collection, advertising, or analytics. The only external connections the app makes are to Nostr relays that you choose to connect to. These relays are operated by independent third parties and are governed by their own privacy policies.
          </p>

          <h2>Data Storage</h2>
          <p>
            All app data (keys, preferences, cached content) is stored locally on your device. No data is stored on any server controlled by Wisp. Uninstalling the app removes all locally stored data.
          </p>

          <h2>Data Sharing</h2>
          <p>
            We do not share any data with third parties because we do not collect any data. Content you choose to publish on the Nostr network is public by the nature of the protocol — this is not something Wisp controls.
          </p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            Wisp is not directed at children under 13. We do not knowingly collect any information from children. Since we collect no data from any user, there is no data to identify or remove.
          </p>

          <h2>Security</h2>
          <p>
            Your private keys are stored in your device&apos;s secure storage. Private messages use NIP-17 encryption. Since no user data is transmitted to or stored on our servers (we have none), there is no centralized data to breach.
          </p>

          <h2>Open Source</h2>
          <p>
            Wisp is fully open source. You can inspect, audit, and verify every claim in this privacy policy by reviewing the source code at{" "}
            <a href="https://github.com/barrydeen/wisp" target="_blank" rel="noopener noreferrer">github.com/barrydeen/wisp</a>.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            If we ever update this privacy policy, changes will be posted on this page with an updated date. Given our commitment to collecting zero data, we do not anticipate significant changes.
          </p>

          <h2>Contact</h2>
          <p>If you have questions about this privacy policy, you can reach us at:</p>
          <ul>
            <li>GitHub: <a href="https://github.com/barrydeen/wisp/issues" target="_blank" rel="noopener noreferrer">github.com/barrydeen/wisp/issues</a></li>
            <li>Nostr: find us on the network</li>
          </ul>
        </div>
      </div>

      <footer className="border-t border-[#1a1a1a] py-8 text-center text-sm text-[#888]">
        &copy; {new Date().getFullYear()} Wisp
      </footer>
    </>
  );
}
