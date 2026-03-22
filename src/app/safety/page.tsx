import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Child Safety Standards — Wisp",
  description:
    "Wisp's child safety standards, CSAE prevention policies, and reporting mechanisms.",
};

export default function SafetyPage() {
  return (
    <>
      <nav className="flex items-center justify-between border-b border-[#1a1a1a] px-8 py-5">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="gradient-text">wisp</span>
        </Link>
      </nav>

      <div className="mx-auto max-w-[720px] px-8 pt-16 pb-24">
        <h1 className="mb-2 text-4xl font-bold tracking-tight">
          Child Safety Standards
        </h1>
        <p className="mb-12 text-sm text-[#888]">Last updated: February 28, 2026</p>

        <div className="space-y-0 text-[15px] leading-relaxed text-[#888] [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[#f0f0f0] [&_strong]:text-[#f0f0f0] [&_strong]:font-semibold [&_a]:text-[#f97316] [&_a:hover]:underline [&_ul]:mb-4 [&_ul]:pl-5 [&_ul]:list-disc [&_ol]:mb-4 [&_ol]:pl-5 [&_ol]:list-decimal [&_li]:mb-2 [&_p]:mb-4">
          <p>
            Wisp is an open-source Android client for the Nostr protocol.{" "}
            <strong>
              Wisp does not operate a service, host content, or run servers.
            </strong>{" "}
            It is a client application that connects to independently operated Nostr
            relays chosen by the user. Despite not being a service operator, we take
            child safety seriously and have designed the app to help users take action
            against harmful content.
          </p>

          <h2>Our Position on CSAE</h2>
          <p>
            <strong>
              Wisp has an absolute zero-tolerance policy toward child sexual abuse and
              exploitation (CSAE).
            </strong>{" "}
            This includes, but is not limited to:
          </p>
          <ul>
            <li>
              Child sexual abuse material (CSAM) — any visual depiction involving a
              minor in sexually explicit conduct
            </li>
            <li>
              Grooming — building a relationship with a minor for the purpose of sexual
              exploitation
            </li>
            <li>Sextortion of minors</li>
            <li>Trafficking of children for sexual purposes</li>
            <li>
              Any content or behavior that sexually exploits, abuses, or endangers
              children
            </li>
          </ul>

          <h2>Our Role as a Client Application</h2>
          <p>
            It is important to understand the architecture of the Nostr protocol:
          </p>
          <ul>
            <li>
              <strong>Wisp is a client</strong> — it reads and publishes content to
              relays but does not store, host, or moderate content itself.
            </li>
            <li>
              <strong>Relays are independently operated servers</strong> — content is
              stored and served by relay operators, each with their own terms of service
              and moderation policies.
            </li>
            <li>
              <strong>Wisp has no backend infrastructure</strong> — there are no Wisp
              servers, databases, or content stores. All data flows directly between the
              user&apos;s device and the relays they connect to.
            </li>
          </ul>
          <p>
            Because we do not operate a service or host content, the responsibility for
            content moderation and removal lies with relay operators. Our role is to{" "}
            <strong>
              empower users to report harmful content directly to relay operators
            </strong>{" "}
            and to provide client-side tools to block such content from view.
          </p>

          <h2>In-App Reporting Tools</h2>
          <p>
            Wisp provides in-app mechanisms that enable users to take action against
            harmful content and submit reports to the appropriate parties:
          </p>
          <ul>
            <li>
              <strong>Report to relay operators:</strong> Users can report individual
              notes and user profiles directly to the relay operators who host that
              content. Reports are submitted to the relay&apos;s moderation channels so
              operators can review and take action under their own policies.
            </li>
            <li>
              <strong>Mute and block:</strong> Users can immediately mute or block
              accounts and content, removing it from their view within the app.
            </li>
            <li>
              <strong>Contact relay operators:</strong> Wisp facilitates communication
              between users and relay operators for reporting concerns, including CSAM
              and CSAE content.
            </li>
          </ul>
          <p>
            We strongly encourage users who encounter CSAM or CSAE content to also
            report it directly to the{" "}
            <a
              href="https://www.missingkids.org/gethelpnow/cybertipline"
              target="_blank"
              rel="noopener noreferrer"
            >
              National Center for Missing &amp; Exploited Children (NCMEC) CyberTipline
            </a>{" "}
            and their local law enforcement.
          </p>

          <h2>Client-Side Protections</h2>
          <p>
            While we cannot moderate content on relays we do not operate, Wisp
            implements the following client-side measures:
          </p>
          <ul>
            <li>
              User-driven muting and blocking to remove harmful content and accounts
              from view
            </li>
            <li>
              Reporting workflows that direct reports to relay operators responsible for
              the content
            </li>
            <li>
              Respect for community-maintained block lists and content labels published
              via the Nostr protocol
            </li>
          </ul>

          <h2>User Responsibility</h2>
          <p>
            Users of Wisp must comply with all applicable laws regarding child safety.
            By using Wisp, you agree that you will not use the app to create,
            distribute, or access CSAM or engage in any form of CSAE. Users who
            encounter such content should:
          </p>
          <ol>
            <li>Use the in-app report function to notify the relay operator</li>
            <li>Mute or block the offending account</li>
            <li>
              Report to{" "}
              <a
                href="https://www.missingkids.org/gethelpnow/cybertipline"
                target="_blank"
                rel="noopener noreferrer"
              >
                NCMEC
              </a>{" "}
              or local law enforcement
            </li>
          </ol>

          <h2>Age Requirement</h2>
          <p>
            Wisp is not intended for use by children under the age of 13. The Nostr
            protocol involves public social networking and direct messaging features
            designed for adult and teen (13+) users.
          </p>

          <h2>Compliance with Law</h2>
          <p>
            We are committed to complying with all applicable child safety laws. Our
            practices are informed by the{" "}
            <a
              href="https://www.technologycoalition.org/developer-good-practices-combating-online-child-sexual-exploitation-and-abuse"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tech Coalition&apos;s best practices for combating online CSEA
            </a>
            . Should we ever obtain actual knowledge of CSAM through our reporting
            channels, we will report it to NCMEC and relevant authorities in accordance
            with U.S. federal law (18 U.S.C. &sect; 2258A).
          </p>

          <h2>Child Safety Point of Contact</h2>
          <p>For child safety concerns or inquiries related to Wisp:</p>
          <ul>
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:safety@wisp.mobile">safety@wisp.mobile</a>
            </li>
            <li>
              <strong>GitHub:</strong>{" "}
              <a
                href="https://github.com/barrydeen/wisp/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/barrydeen/wisp/issues
              </a>
            </li>
          </ul>
          <p>
            For immediate concerns regarding a child&apos;s safety, please contact the{" "}
            <a
              href="https://www.missingkids.org/gethelpnow/cybertipline"
              target="_blank"
              rel="noopener noreferrer"
            >
              NCMEC CyberTipline
            </a>{" "}
            or your local law enforcement directly.
          </p>

          <h2>Open Source Transparency</h2>
          <p>
            Wisp is fully open source. All safety mechanisms, reporting features, and
            client-side protections can be verified by reviewing the source code at{" "}
            <a
              href="https://github.com/barrydeen/wisp"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/barrydeen/wisp
            </a>
            .
          </p>

          <h2>Updates</h2>
          <p>
            This policy may be updated to reflect improvements in our safety practices
            or changes in legal requirements. Updates will be posted on this page with a
            revised date.
          </p>
        </div>
      </div>

      <footer className="border-t border-[#1a1a1a] py-8 text-center text-sm text-[#888]">
        &copy; {new Date().getFullYear()} Wisp
      </footer>
    </>
  );
}
