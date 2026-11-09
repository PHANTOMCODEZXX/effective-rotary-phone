/* ==========================================================================
   KAETI ENTERPRISES — site behaviour
   No dependencies. Everything here is progressive enhancement: the page
   reads correctly with JavaScript disabled, and data-driven sections stay
   hidden until real entries exist in assets/js/content.js
   ========================================================================== */
(function () {
  "use strict";

  const site = window.KAETI_SITE || {};
  const qs = (selector, scope) => (scope || document).querySelector(selector);
  const qsa = (selector, scope) => Array.from((scope || document).querySelectorAll(selector));
  const motionQuery =
    typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;
  const reducedMotion = Boolean(motionQuery && motionQuery.matches);

  const filled = (value) => typeof value === "string" && value.trim() !== "";
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  };

  /* Small icon set for contact + social links (static markup, not user input) */
  const ICONS = {
    mail: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.34-1.4a9.84 9.84 0 0 0 4.7 1.2h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.48 2 12.04 2Zm0 17.96h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.15 8.15 0 0 1-1.25-4.34c0-4.52 3.68-8.2 8.2-8.2a8.2 8.2 0 0 1 8.2 8.2c0 4.52-3.68 8.18-8.2 8.18Zm4.5-6.12c-.25-.13-1.47-.72-1.7-.8-.23-.09-.4-.13-.56.12-.17.25-.64.8-.79.97-.15.16-.29.18-.54.06a6.7 6.7 0 0 1-1.97-1.22 7.4 7.4 0 0 1-1.36-1.7c-.14-.25-.02-.38.1-.51.12-.13.25-.3.37-.45.12-.15.16-.25.25-.42.08-.16.04-.31-.03-.44-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.25-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.11 3.64.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.3Z"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M16.2 2h-2.9v12.3a2.6 2.6 0 1 1-2.1-2.55V8.8a5.6 5.6 0 1 0 5 5.57V8.9a6.4 6.4 0 0 0 3.8 1.24V7.2a3.7 3.7 0 0 1-3.8-3.6V2Z"/></svg>',
    whatsappSolid: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.34-1.4a9.84 9.84 0 0 0 4.7 1.2h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.48 2 12.04 2Zm0 17.96h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.15 8.15 0 0 1-1.25-4.34c0-4.52 3.68-8.2 8.2-8.2a8.2 8.2 0 0 1 8.2 8.2c0 4.52-3.68 8.18-8.2 8.18Zm4.5-6.12c-.25-.13-1.47-.72-1.7-.8-.23-.09-.4-.13-.56.12-.17.25-.64.8-.79.97-.15.16-.29.18-.54.06a6.7 6.7 0 0 1-1.97-1.22 7.4 7.4 0 0 1-1.36-1.7c-.14-.25-.02-.38.1-.51.12-.13.25-.3.37-.45.12-.15.16-.25.25-.42.08-.16.04-.31-.03-.44-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.25-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.11 3.64.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.3Z"/></svg>',
  };

  function iconSpan(name) {
    const span = el("span");
    span.innerHTML = ICONS[name] || "";
    span.setAttribute("aria-hidden", "true");
    return span;
  }

  function revealSection(id) {
    const section = document.getElementById(id);
    if (section) section.hidden = false;
    const navItem = qs('[data-nav-for="' + id + '"]');
    if (navItem) navItem.hidden = false;
  }

  /* ------------------------------------------------------------------
     HERO STATS
     ------------------------------------------------------------------ */
  function renderStats(stats) {
    const list = qs("#hero-stats");
    if (!list || !Array.isArray(stats)) return;

    const entries = stats.filter(
      (stat) => stat && filled(String(stat.value || "")) && filled(String(stat.label || ""))
    );
    if (!entries.length) return;

    entries.forEach((stat) => {
      const item = el("li", "stat");
      item.append(el("span", "stat__value", String(stat.value).trim()));
      item.append(el("span", "stat__label", String(stat.label).trim()));
      list.append(item);
    });

    list.hidden = false;
  }

  /* ------------------------------------------------------------------
     CASE STUDIES
     ------------------------------------------------------------------ */
  function renderCaseStudies(caseStudies) {
    const grid = qs("#results-grid");
    if (!grid || !Array.isArray(caseStudies)) return;

    const entries = caseStudies.filter((item) => {
      if (!item) return false;
      const metrics = Array.isArray(item.metrics) ? item.metrics : [];
      const hasMetric = metrics.some(
        (metric) => metric && filled(String(metric.value || "")) && filled(String(metric.label || ""))
      );
      return filled(item.industry) || filled(item.challenge) || filled(item.action) || hasMetric;
    });
    if (!entries.length) return;

    entries.forEach((item) => {
      const card = el("article", "card case");

      if (filled(item.industry)) {
        card.append(el("p", "case__industry", item.industry.trim()));
      }

      [
        ["Challenge", item.challenge],
        ["What we did", item.action],
      ].forEach(([label, value]) => {
        if (!filled(value)) return;
        const row = el("div", "case__row");
        row.append(el("span", "case__label", label));
        row.append(el("p", null, value.trim()));
        card.append(row);
      });

      const metrics = (Array.isArray(item.metrics) ? item.metrics : []).filter(
        (metric) => metric && filled(String(metric.value || "")) && filled(String(metric.label || ""))
      );

      if (metrics.length) {
        const wrap = el("div", "case__metrics");
        metrics.forEach((metric) => {
          const metricEl = el("div", "metric");
          metricEl.append(el("span", "metric__value", String(metric.value).trim()));
          metricEl.append(el("span", "metric__label", String(metric.label).trim()));
          wrap.append(metricEl);
        });
        card.append(wrap);
      }

      grid.append(card);
    });

    revealSection("results");

    /* Results exist, so the hero's secondary CTA can point at them */
    const secondary = qs("[data-secondary-cta]");
    if (secondary) {
      secondary.textContent = "See results";
      secondary.setAttribute("href", "#results");
    }
  }

  /* ------------------------------------------------------------------
     TESTIMONIALS
     ------------------------------------------------------------------ */
  function renderTestimonials(testimonials) {
    const grid = qs("#testimonials-grid");
    if (!grid || !Array.isArray(testimonials)) return;

    const entries = testimonials.filter((item) => item && filled(item.quote));
    if (!entries.length) return;

    entries.forEach((item) => {
      const figure = el("figure", "card testimonial");
      const quote = el("blockquote");
      quote.append(el("p", null, item.quote.trim()));
      figure.append(quote);

      const name = filled(item.name) ? item.name.trim() : "";
      const business = filled(item.business) ? item.business.trim() : "";

      if (name || business) {
        const caption = el("figcaption");
        if (name) caption.append(el("span", "testimonial__name", name));
        if (business) caption.append(document.createTextNode(business));
        figure.append(caption);
      }

      grid.append(figure);
    });

    revealSection("testimonials");
  }

  /* ------------------------------------------------------------------
     INSTAGRAM
     ------------------------------------------------------------------ */
  function renderInstagram(instagram) {
    if (!instagram || !filled(instagram.url)) return;

    const url = instagram.url.trim();
    const handle = filled(instagram.handle) ? instagram.handle.trim().replace(/^@+/, "") : "";
    const atHandle = handle ? "@" + handle : "";
    const followers = filled(String(instagram.followers || "")) ? String(instagram.followers).trim() : "";

    const link = qs("#instagram-link");
    if (link) link.href = url;

    const line = qs("#instagram-handle-line");
    if (line) {
      const parts = [];
      if (atHandle) parts.push(atHandle);
      if (followers) parts.push(followers + (followers.toLowerCase().includes("follower") ? "" : " followers"));
      if (parts.length) {
        line.textContent = parts.join(" · ");
      } else {
        line.remove();
      }
    }

    const grid = qs("#instagram-grid");
    if (grid) {
      for (let i = 0; i < 6; i += 1) {
        const item = el("li");
        const tile = el("a", "tile");
        tile.href = url;
        tile.target = "_blank";
        tile.rel = "noopener";
        tile.setAttribute(
          "aria-label",
          "Open " + (atHandle ? atHandle : "our Instagram profile") + " on Instagram"
        );
        const mark = el("span", "tile__mark", "K");
        mark.setAttribute("aria-hidden", "true");
        tile.append(mark);
        tile.append(el("span", "tile__label", "Instagram"));
        item.append(tile);
        grid.append(item);
      }
    }

    revealSection("instagram");
  }

  /* ------------------------------------------------------------------
     DIRECT CONTACT
     ------------------------------------------------------------------ */
  function renderDirect(direct) {
    const list = qs("#contact-direct");
    if (!list || !direct) return;

    const entries = [];
    if (filled(direct.email)) {
      entries.push({
        href: "mailto:" + direct.email.trim(),
        label: direct.email.trim(),
        icon: "mail",
      });
    }
    if (filled(direct.whatsapp)) {
      entries.push({
        href: direct.whatsapp.trim(),
        label: "Message on WhatsApp",
        icon: "whatsapp",
        external: true,
      });
    }
    if (filled(direct.calendly)) {
      entries.push({
        href: direct.calendly.trim(),
        label: "Book a free strategy call",
        icon: "calendar",
        external: true,
      });
    }

    if (!entries.length) return;

    entries.forEach((entry) => {
      const item = el("li");
      const link = el("a");
      link.href = entry.href;
      if (entry.external) {
        link.target = "_blank";
        link.rel = "noopener";
      }
      link.append(iconSpan(entry.icon));
      link.append(document.createTextNode(entry.label));
      item.append(link);
      list.append(item);
    });

    list.hidden = false;
  }

  /* ------------------------------------------------------------------
     FOOTER SOCIAL + MOBILE WHATSAPP FLOAT
     ------------------------------------------------------------------ */
  function renderSocial(social) {
    if (!social) return;

    const list = qs("#footer-social");
    const map = [
      { key: "instagram", label: "Instagram", icon: "instagram" },
      { key: "tiktok", label: "TikTok", icon: "tiktok" },
      { key: "whatsapp", label: "WhatsApp", icon: "whatsappSolid" },
    ];

    if (list) {
      map.forEach((entry) => {
        if (!filled(social[entry.key])) return;
        const item = el("li");
        const link = el("a");
        link.href = social[entry.key].trim();
        link.target = "_blank";
        link.rel = "noopener";
        link.setAttribute("aria-label", entry.label + " (opens in a new tab)");
        link.append(iconSpan(entry.icon));
        item.append(link);
        list.append(item);
      });
      if (list.children.length) list.hidden = false;
    }

    const fab = qs("#whatsapp-fab");
    const fabHost = qs("#whatsapp-fab-host");
    if (fab && filled(social.whatsapp)) {
      fab.href = social.whatsapp.trim();
      fab.hidden = false;
      if (fabHost) fabHost.hidden = false;
    }
  }

  /* ------------------------------------------------------------------
     PRIMARY CTA → BOOKING LINK
     If a scheduling link exists, the primary call buttons go straight to
     it instead of scrolling to the contact form.
     ------------------------------------------------------------------ */
  function applyBookingLink() {
    const calendly = site.direct && site.direct.calendly;
    if (!filled(calendly)) return;

    qsa("[data-book-cta]").forEach((link) => {
      link.href = calendly.trim();
      link.target = "_blank";
      link.rel = "noopener";
    });
  }

  /* ------------------------------------------------------------------
     HEADER + MOBILE NAV
     ------------------------------------------------------------------ */
  function initHeader() {
    const header = qs("[data-header]");
    const toggle = qs("[data-nav-toggle]");
    const nav = qs("#site-nav");
    let open = false;
    let ticking = false;

    if (header) {
      const update = () => {
        header.classList.toggle("is-condensed", window.scrollY > 12);
        ticking = false;
      };
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(update);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      update();
    }

    if (!toggle || !nav) return;

    const firstLink = qs("a", nav);

    function setOpen(next) {
      open = next;
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      nav.setAttribute("data-open", String(open));
      document.body.classList.toggle("nav-open", open);
      if (open && firstLink) firstLink.focus({ preventScroll: true });
    }

    toggle.addEventListener("click", () => setOpen(!open));

    qsa("a", nav).forEach((link) => {
      link.addEventListener("click", () => {
        if (open) setOpen(false);
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", (event) => {
      if (!open) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      setOpen(false);
    });

    if (typeof window.matchMedia !== "function") return;
    const desktop = window.matchMedia("(min-width: 900px)");
    const onChange = (event) => {
      if (event.matches && open) setOpen(false);
    };
    if (desktop.addEventListener) desktop.addEventListener("change", onChange);
    else desktop.addListener(onChange);
  }

  /* ------------------------------------------------------------------
     SCROLL SPY — marks the section currently in view
     ------------------------------------------------------------------ */
  function initScrollSpy() {
    if (!("IntersectionObserver" in window)) return;

    const links = qsa('.nav__link[href^="#"]');
    const sections = links
      .map((link) => document.getElementById(link.getAttribute("href").slice(1)))
      .filter(Boolean);

    if (!sections.length) return;

    const setCurrent = (id) => {
      links.forEach((link) => {
        if (link.getAttribute("href") === "#" + id) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCurrent(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));

    /* Back at the hero, no section link should claim to be current */
    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY < 80) links.forEach((link) => link.removeAttribute("aria-current"));
      },
      { passive: true }
    );
  }

  /* ------------------------------------------------------------------
     SCROLL REVEAL
     ------------------------------------------------------------------ */
  function initReveal() {
    const items = qsa("[data-reveal]");
    if (!items.length) return;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 }
    );

    items.forEach((item) => {
      const delay = item.getAttribute("data-reveal-delay");
      if (delay) item.style.setProperty("--reveal-delay", delay);
      observer.observe(item);
    });
  }

  /* ------------------------------------------------------------------
     CONTACT FORM
     ------------------------------------------------------------------ */
  function initForm() {
    const form = qs("#contact-form");
    if (!form) return;

    const successPanel = qs("#form-success");
    const successTitle = qs("#form-success-title");
    const resetButton = qs("#reset-form");
    const status = qs("#form-status");
    const submit = qs("#submit-btn");
    const honeypot = qs('input[name="_gotcha"]');
    const endpoint = filled(site.formEndpoint) ? site.formEndpoint.trim() : "";

    /* When no endpoint is configured the success panel is a stub, and it says so —
       a silent "sent" message would hide real enquiries during setup. */
    if (!endpoint && successPanel) {
      const stubNote = el(
        "p",
        "form-success__note",
        "Demo mode: no form endpoint is connected yet, so this enquiry has not been sent. Add one in assets/js/content.js to go live."
      );
      const reset = qs("#reset-form");
      if (reset) successPanel.insertBefore(stubNote, reset);
      else successPanel.append(stubNote);
    }

    const fields = {
      name: {
        input: qs("#name"),
        error: qs("#name-error"),
        validate: (value) => (value.trim().length >= 2 ? "" : "Please enter your name."),
        message: "Please enter your name.",
      },
      email: {
        input: qs("#email"),
        error: qs("#email-error"),
        validate: (value) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
            ? ""
            : "Enter a valid email address, like name@business.com.",
        message: "Enter a valid email address, like name@business.com.",
      },
      instagram: {
        input: qs("#instagram-handle"),
        error: qs("#instagram-handle-error"),
        validate: (value) => {
          const handle = value.trim().replace(/^@+/, "");
          if (!handle) return "";
          return /^[A-Za-z0-9._]{1,30}$/.test(handle)
            ? ""
            : "Use a valid handle: letters, numbers, dots, or underscores.";
        },
        message: "Use a valid handle: letters, numbers, dots, or underscores.",
      },
      service: {
        input: qs("#service"),
        error: qs("#service-error"),
        validate: (value) => (filled(value) ? "" : "Choose the service you are interested in."),
        message: "Choose the service you are interested in.",
      },
      message: {
        input: qs("#message"),
        error: qs("#message-error"),
        validate: (value) =>
          value.trim().length >= 10 ? "" : "Tell me a little more — at least 10 characters.",
        message: "Tell me a little more — at least 10 characters.",
      },
    };

    const activeFields = Object.values(fields).filter((field) => field.input && field.error);

    function setFieldError(field, message) {
      const hasError = Boolean(message);
      if (hasError) {
        field.error.textContent = message;
        field.error.hidden = false;
        field.input.setAttribute("aria-invalid", "true");
      } else {
        field.error.textContent = "";
        field.error.hidden = true;
        field.input.removeAttribute("aria-invalid");
      }
    }

    function clearStatus() {
      if (!status) return;
      status.textContent = "";
      status.className = "form__status";
    }

    activeFields.forEach((field) => {
      const clear = () => {
        if (field.input.getAttribute("aria-invalid") === "true") setFieldError(field, "");
      };
      field.input.addEventListener("input", clear);
      field.input.addEventListener("change", clear);
      field.input.addEventListener("blur", () => {
        if (!field.input.value) return;
        setFieldError(field, field.validate(field.input.value));
      });
    });

    function showSuccess() {
      if (!form || !successPanel) return;
      form.hidden = true;
      successPanel.hidden = false;
      if (successTitle) successTitle.focus({ preventScroll: true });
      successPanel.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
    }

    function resetForm() {
      form.reset();
      activeFields.forEach((field) => setFieldError(field, ""));
      clearStatus();
      if (submit) {
        submit.disabled = false;
        submit.textContent = "Send enquiry";
        submit.removeAttribute("aria-busy");
      }
      if (successPanel) successPanel.hidden = true;
      form.hidden = false;
      const first = qs("#name");
      if (first) first.focus();
    }

    if (resetButton) resetButton.addEventListener("click", resetForm);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      clearStatus();

      /* Bot trap: pretend everything is fine, send nothing */
      if (honeypot && filled(honeypot.value)) {
        showSuccess();
        return;
      }

      let firstInvalid = null;
      activeFields.forEach((field) => {
        const message = field.validate(field.input.value);
        setFieldError(field, message);
        if (message && !firstInvalid) firstInvalid = field.input;
      });

      if (firstInvalid) {
        firstInvalid.focus();
        if (status) {
          status.textContent = "Please check the highlighted fields and try again.";
          status.className = "form__status is-error";
        }
        return;
      }

      const payload = {
        name: fields.name.input.value.trim(),
        email: fields.email.input.value.trim(),
        instagram: fields.instagram.input.value.trim().replace(/^@+/, ""),
        service: fields.service.input.value,
        message: fields.message.input.value.trim(),
      };

      if (submit) {
        submit.disabled = true;
        submit.setAttribute("aria-busy", "true");
        submit.textContent = "Sending…";
      }

      if (!endpoint) {
        /* ------------------------------------------------------------------
           TODO: connect a form backend.
           Set `formEndpoint` in assets/js/content.js to a URL that accepts a
           JSON POST (Formspree, Basin, Netlify Forms, your own handler, ...).
           Until then this is a visible success-state stub — no data is sent.
           ------------------------------------------------------------------ */
        window.setTimeout(() => {
          if (submit) submit.textContent = "Send enquiry";
          showSuccess();
        }, 600);
        return;
      }

      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Request failed with status " + response.status);
          showSuccess();
        })
        .catch(() => {
          if (status) {
            status.textContent = filled(site.direct && site.direct.email)
              ? "Something went wrong sending the form. Please email " + site.direct.email.trim() + " instead."
              : "Something went wrong sending the form. Please try again in a moment.";
            status.className = "form__status is-error";
          }
        })
        .finally(() => {
          if (submit) {
            submit.disabled = false;
            submit.removeAttribute("aria-busy");
            submit.textContent = "Send enquiry";
          }
        });
    });
  }

  /* ------------------------------------------------------------------
     MISC
     ------------------------------------------------------------------ */
  function initMisc() {
    const year = qs("#year");
    if (year) year.textContent = String(new Date().getFullYear());

    /* Smooth scrolling fallback for browsers without CSS scroll-behavior */
    if (!("scrollBehavior" in document.documentElement.style) && !reducedMotion) {
      qsa('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
          const id = link.getAttribute("href").slice(1);
          const target = id ? document.getElementById(id) : null;
          if (!target) return;
          event.preventDefault();
          window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
        });
      });
    }
  }

  /* ------------------------------------------------------------------
     BOOT
     ------------------------------------------------------------------ */
  function boot() {
    renderStats(site.stats);
    renderCaseStudies(site.caseStudies);
    renderTestimonials(site.testimonials);
    renderInstagram(site.instagram);
    renderDirect(site.direct);
    renderSocial(site.social);
    applyBookingLink();

    initHeader();
    initReveal();
    initScrollSpy();
    initForm();
    initMisc();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
