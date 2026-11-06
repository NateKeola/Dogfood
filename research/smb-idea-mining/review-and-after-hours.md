# Review assistance and after-hours intake

Both are proposed operations services, not deployed agents. Validate the business's existing workflow before replacing it. A human-controlled callback queue may be more appropriate than a conversational voice agent.

## Review workflow: research prompt

Research [BUSINESS TYPE] review-request and response assistance using [PLATFORMS] and [AUTHORIZED SYSTEMS]. Verify current platform rules and applicable consumer-protection, messaging and privacy requirements. Map eligible completed-service events, approved contact channels, neutral request timing, suppression/opt-out handling and human ownership.

Do not buy or fabricate reviews, impersonate customers, offer incentives contrary to platform rules, suppress negative experiences or send only satisfied customers to public review sites. Do not infer sentiment as a permission to gate invitations. Requests must reflect genuine experiences. Public responses must not reveal private customer details.

Design:
1. Approved event triggers and deduplication so one job does not cause repeated requests.
2. A neutral invitation, approved channel, consent/permission basis and opt-out.
3. Platform-compliant public review destination and independent support path available without sentiment gating.
4. Response drafts grounded in the actual review, with no invented facts or admissions/commitments. Escalate threats, legal disputes, sensitive information and serious safety complaints.
5. Human approval of external messages; audit log, failed-send visibility and suppression.
6. Data minimization, limited retention, access controls and owner handoff.

Deliver current-source register, workflow diagram in prose, message drafts, risk analysis, test cases, cost assumptions and a pilot proposal. Do not send messages or activate a platform. Measure request eligibility/delivery, duplicate prevention, opt-outs and response-review time. Changes in ratings are observed outcomes with confounders, not guaranteed benefits.

## After-hours workflow: research prompt

Design a bounded after-hours intake service for [SERVICE BUSINESS] covering [HOURS/TIME ZONE], [CHANNELS] and [AUTHORIZED KNOWLEDGE]. Determine whether a missed-call callback queue, web intake or disclosed conversational assistant best fits the task.

Research current provider availability, account permissions, terms, pricing, call/text consent and recording/transcription rules for relevant jurisdictions. Separate live answering from outbound marketing; inbound contact does not provide unlimited later outreach consent. Obtain required approval before provisioning or contacting anyone.

Map:
- Disclosure and consent where required, language/accessibility needs and a human alternative.
- Minimal caller/contact information, service area, request category and preferred callback.
- Authorized hours, services and facts; explicit unknown answers.
- Emergency and urgent situations with pre-approved routing. Do not diagnose, guarantee rescue or substitute for emergency services.
- Existing-customer versus new-request paths and sensitive-data avoidance.
- Real availability integration only when authorized; otherwise collect preferences without claiming a confirmed booking.
- Handoff destination, delivery acknowledgment, retries, duplicate prevention, timezone/DST handling and owner escalation.
- Fail-safe behavior for provider outage, low-confidence understanding, caller interruption, hostile instructions and failed transfer.
- Retention, access, redaction, deletion, vendor/subprocessor diligence and incident response.
- Usage caps, alerts, cost-per-attempt versus connected-minute assumptions and stop conditions.

Provide a minimal architecture, state transitions, approved knowledge schema, sample fictional dialogues, human responsibilities, acceptance tests, provider-cost model and go/no-go gates. No live integration, calling, texting or data transfer follows from the plan.

## Acceptance tests and measurement

Use fictional data in an authorized test environment. Test repeated calls/events, ambiguous requests, interruption, language mismatch, missing details, unavailable staff, wrong timezone, out-of-area requests, no real calendar availability, callback failure, duplicate webhooks, outage and adversarial instructions. A demo UI is not proof that routing works.

Before a pilot, measure existing missed-request volume and response process with authorized records; agree on callback targets and failure escalation. Track completed handoffs, missed/duplicate requests, correction rate, latency and actual cost. Avoid promising booked jobs or revenue.

## Research starting points

- Google contributed-content policy: https://support.google.com/contributionpolicy/answer/7400114
- FTC reviews and endorsements resources: https://www.ftc.gov/business-guidance/advertising-marketing/endorsements-influencers-reviews
- FTC consumer reviews/testimonials rule: https://www.ftc.gov/legal-library/browse/rules/rule-use-consumer-reviews-testimonials
- FTC commercial email guidance: https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business
- FCC robocalls/robotexts resources: https://www.fcc.gov/general/telemarketing-and-robocalls
- Twilio voice documentation: https://www.twilio.com/docs/voice
- Twilio messaging policy: https://www.twilio.com/en-us/legal/messaging-policy

These are starting sources to verify in the next scoped research pass, not a completed legal/provider diligence assessment.

Related internal research: [law-firm intake](https://github.com/NateKeola/SMB-Offerings/tree/725509ee760f3b3348caef41558e7eebcfa161a1/opportunities/law-firm-intake) and [unmerged outbound-phone research draft #3](https://github.com/NateKeola/SMB-Offerings/pull/3). Healthcare/legal or other regulated intake requires separate domain controls; this generic module does not authorize such a rollout.
