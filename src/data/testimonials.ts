export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  detail: string;
  avatarSrc: string;
  avatarAlt: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "sarah",
    quote:
      "Asked about water damage late at night. Got a clear answer with the policy section linked.",
    name: "Sarah M.",
    detail: "HomeProtect Plus · Portland, OR",
    avatarSrc: "/landing/avatar-1.jpg",
    avatarAlt: "Sarah, FailSafe policyholder",
  },
  {
    id: "james",
    quote:
      "Filed my claim in one sitting. Uploaded photos and had an adjuster assigned the next morning.",
    name: "James L.",
    detail: "HomeProtect Plus · Austin, TX",
    avatarSrc: "/landing/avatar-2.jpg",
    avatarAlt: "James, FailSafe policyholder",
  },
  {
    id: "priya",
    quote:
      "Claim status used to mean hold music. Now I open ClaimSmart and know where things stand.",
    name: "Priya K.",
    detail: "HomeProtect Plus · Chicago, IL",
    avatarSrc: "/landing/avatar-3.jpg",
    avatarAlt: "Priya, FailSafe policyholder",
  },
];
