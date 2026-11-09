/* ==========================================================================
   KAETI ENTERPRISES — site content
   --------------------------------------------------------------------------
   This file is the only place you need to edit to add real data.
   Every list starts empty on purpose: nothing here is invented.

   HOW EMPTY SLOTS BEHAVE
   - stats:        the stat row is hidden until at least one entry exists
   - caseStudies:  the Results section and its nav link stay hidden until at
                   least one case study exists
   - testimonials: the Testimonials section and its nav link stay hidden until
                   at least one testimonial exists
   - instagram:    the Instagram section stays hidden until `url` is set
   - direct:       each contact method is shown only when its value is filled
   - social:       each footer icon is shown only when its URL is filled
   - formEndpoint: when empty, the form shows a success state instead of
                   sending (see the TODO in assets/js/main.js)

   Values are used exactly as written. The build never adds, estimates,
   or rounds a number for you.

   Replace the examples below by removing the comment markers.
   ========================================================================== */

window.KAETI_SITE = {
  /* ------------------------------------------------------------------
     HERO STAT BADGES
     Only add figures you can verify. Example shape:
     { value: "50+", label: "brands managed" }
     ------------------------------------------------------------------ */
  stats: [
    // { value: "1.2M+", label: "reach generated" },
    // { value: "50+", label: "brands managed" },
  ],

  /* ------------------------------------------------------------------
     CASE STUDIES
     Limit yourself to the data you actually have. Any field left as ""
     is skipped, and a card only renders if it has at least one real
     challenge, action, or metric.
     {
       industry: "Beauty retail",
       challenge: "Paid social was spending without a clear offer.",
       action: "Rebuilt the offer, then tested three hooks a week for 60 days.",
       metrics: [
         { value: "+312%", label: "engagement in 90 days" },
         { value: "-38%", label: "cost per enquiry" }
       ]
     }
     ------------------------------------------------------------------ */
  caseStudies: [
    // { industry: "", challenge: "", action: "", metrics: [] },
  ],

  /* ------------------------------------------------------------------
     TESTIMONIALS
     Quote only, or quote plus attribution. Never write one yourself.
     {
       quote: "The first month of content finally sounded like our shop.",
       name: "Client name",
       business: "Business name"
     }
     ------------------------------------------------------------------ */
  testimonials: [
    // { quote: "", name: "", business: "" },
  ],

  /* ------------------------------------------------------------------
     INSTAGRAM / SOCIAL PROOF
     handle:    without the @, e.g. "yourhandle"
     url:       full profile URL — the section is hidden while this is empty
     followers: e.g. "8.4K" — omit or leave "" to hide the count
     ------------------------------------------------------------------ */
  instagram: {
    handle: "",
    url: "",
    followers: "",
  },

  /* ------------------------------------------------------------------
     DIRECT CONTACT
     email:    "hello@example.com"
     whatsapp: full wa.me link, e.g. "https://wa.me/254700000000"
     calendly: full scheduling link
     ------------------------------------------------------------------ */
  direct: {
    email: "",
    whatsapp: "",
    calendly: "",
  },

  /* ------------------------------------------------------------------
     SOCIAL PROFILES (footer icons, and the WhatsApp float on mobile)
     ------------------------------------------------------------------ */
  social: {
    instagram: "",
    tiktok: "",
    whatsapp: "",
  },

  /* ------------------------------------------------------------------
     FORM ENDPOINT
     Leave empty to use the success-state stub, or paste a URL that
     accepts a JSON POST (Formspree, Basin, your own handler, etc.).
     ------------------------------------------------------------------ */
  formEndpoint: "",
};
