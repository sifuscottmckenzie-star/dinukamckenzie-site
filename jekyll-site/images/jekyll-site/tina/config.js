import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "/",
  },

  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "/",
    },
  },

  schema: {
    collections: [

      // ── SITE-WIDE SETTINGS ──────────────────────────────────────────
      {
        name: "site",
        label: "Site Settings",
        path: "_data",
        format: "yml",
        ui: {
          allowedActions: { create: false, delete: false },
          global: true,
        },
        match: { include: "site" },
        fields: [

          // Announce Bar
          { type: "string",  name: "announce_text",  label: "Announce Bar — Bold Text" },
          { type: "string",  name: "announce_book",  label: "Announce Bar — Book Title" },
          { type: "string",  name: "announce_sub",   label: "Announce Bar — Subtitle" },

          // Hero
          { type: "string",  name: "hero_eyebrow",   label: "Hero — Eyebrow Text" },
          { type: "string",  name: "hero_name_line1", label: "Hero — Name Line 1" },
          { type: "string",  name: "hero_name_line2", label: "Hero — Name Line 2" },
          { type: "string",  name: "hero_badge",      label: "Hero — Badge Text" },
          { type: "string",  name: "hero_tagline",    label: "Hero — Tagline" },
          { type: "image",   name: "hero_photo",      label: "Hero — Author Photo" },
          { type: "string",  name: "hero_btn1_label", label: "Hero — Button 1 Label" },
          { type: "string",  name: "hero_btn2_label", label: "Hero — Button 2 Label" },

          // Marquee
          {
            type: "object", name: "marquee_items", label: "Marquee — Scrolling Items",
            list: true,
            ui: { itemProps: (item) => ({ label: item }) },
            fields: [{ type: "string", name: "", label: "Item Text" }],
          },

          // She Lied First Promo
          { type: "string",  name: "slf_tag",        label: "SLF Promo — Tag" },
          { type: "string",  name: "slf_title",       label: "SLF Promo — Title" },
          { type: "string",  name: "slf_author",      label: "SLF Promo — Author Line" },
          { type: "string",  name: "slf_tagline",     label: "SLF Promo — Tagline" },
          { type: "string",  name: "slf_desc",        label: "SLF Promo — Description", ui: { component: "textarea" } },
          { type: "string",  name: "slf_publisher",   label: "SLF Promo — Publisher Line" },
          { type: "string",  name: "slf_buy_url",     label: "SLF Promo — Buy Button URL" },
          { type: "string",  name: "slf_buy_label",   label: "SLF Promo — Buy Button Label" },

          // About
          { type: "string",  name: "about_bio_para1",    label: "About — Bio Paragraph 1", ui: { component: "textarea" } },
          { type: "string",  name: "about_bio_para2",    label: "About — Bio Paragraph 2", ui: { component: "textarea" } },
          { type: "string",  name: "about_bio_para3",    label: "About — Bio Paragraph 3", ui: { component: "textarea" } },
          { type: "string",  name: "about_bio_para4",    label: "About — Bio Paragraph 4", ui: { component: "textarea" } },
          { type: "string",  name: "about_pronunciation", label: "About — Pronunciation Note" },
          { type: "image",   name: "about_photo",         label: "About — Main Photo" },

          // Contact
          {
            type: "object", name: "contact_entries", label: "Contact — Entries",
            list: true,
            ui: { itemProps: (item) => ({ label: `${item.index} — ${item.title}` }) },
            fields: [
              { type: "string", name: "index", label: "Index (e.g. 01)" },
              { type: "string", name: "title", label: "Role / Title" },
              { type: "string", name: "who",   label: "Name & Organisation" },
              { type: "string", name: "email", label: "Email Address" },
            ],
          },
        ],
      },

      // ── BOOKS ──────────────────────────────────────────────────────────
      {
        name: "books",
        label: "Books",
        path: "_data/books",
        format: "yml",
        ui: {
          allowedActions: { create: true, delete: false },
        },
        fields: [
          { type: "string", name: "id",    label: "Book ID (slug, e.g. torrent)" },
          { type: "string", name: "num",   label: "Series Number (e.g. Book One)" },
          { type: "string", name: "title", label: "Title" },
          { type: "string", name: "year",  label: "Year & Publisher" },
          { type: "string", name: "desc",  label: "Short Description (tagline)" },
          { type: "string", name: "synopsis", label: "Synopsis", ui: { component: "textarea" } },
          { type: "string", name: "buy_au_url",   label: "Buy Now AU — URL" },
          { type: "string", name: "buy_au_label", label: "Buy Now AU — Label" },
          { type: "string", name: "buy_uk_url",   label: "Buy Now UK — URL" },
          { type: "string", name: "buy_uk_label", label: "Buy Now UK — Label" },
          { type: "string", name: "more_url",     label: "More Details — URL" },
          { type: "image",  name: "cover_au",     label: "Cover — AU Edition" },
          { type: "image",  name: "cover_uk",     label: "Cover — UK Edition" },
          {
            type: "object", name: "awards", label: "Awards",
            list: true,
            fields: [{ type: "string", name: "award", label: "Award Text" }],
          },
          {
            type: "object", name: "reviews", label: "Reviews",
            list: true,
            ui: { itemProps: (item) => ({ label: item.by }) },
            fields: [
              { type: "string", name: "text", label: "Quote", ui: { component: "textarea" } },
              { type: "string", name: "by",   label: "Attribution" },
            ],
          },
        ],
      },

      // ── UPCOMING EVENTS ────────────────────────────────────────────────
      {
        name: "upcoming_events",
        label: "Upcoming Events",
        path: "_data/events",
        format: "yml",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        match: { include: "upcoming" },
        fields: [
          {
            type: "object", name: "events", label: "Events",
            list: true,
            ui: { itemProps: (item) => ({ label: `${item.day} ${item.month} — ${item.title}` }) },
            fields: [
              { type: "string", name: "day",    label: "Day", ui: { description: "e.g. 22" } },
              { type: "string", name: "month",  label: "Month & Year", ui: { description: "e.g. May 2026" } },
              { type: "string", name: "title",  label: "Event Title" },
              { type: "string", name: "venue",  label: "Venue" },
              { type: "string", name: "link",   label: "Ticket / Registration URL" },
              { type: "string", name: "button", label: "Button Label", ui: { description: "e.g. Book Tickets → or Register →" } },
            ],
          },
        ],
      },

      // ── PAST EVENTS ────────────────────────────────────────────────────
      {
        name: "past_events",
        label: "Past Events",
        path: "_data/events",
        format: "yml",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        match: { include: "past" },
        fields: [
          {
            type: "object", name: "years", label: "Years",
            list: true,
            ui: { itemProps: (item) => ({ label: item.year }) },
            fields: [
              { type: "string", name: "year", label: "Year" },
              {
                type: "object", name: "events", label: "Events",
                list: true,
                ui: { itemProps: (item) => ({ label: `${item.date} — ${item.title}` }) },
                fields: [
                  { type: "string", name: "date",  label: "Date", ui: { description: "e.g. Nov 26 or Sep 13–14" } },
                  { type: "string", name: "title", label: "Event Title" },
                ],
              },
            ],
          },
        ],
      },

      // ── PODCASTS ───────────────────────────────────────────────────────
      {
        name: "podcasts",
        label: "Podcasts",
        path: "_data",
        format: "yml",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        match: { include: "podcasts" },
        fields: [
          {
            type: "object", name: "podcasts", label: "Podcast Episodes",
            list: true,
            ui: { itemProps: (item) => ({ label: item.title }) },
            fields: [
              { type: "string", name: "title",       label: "Podcast Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "link",        label: "Listen URL" },
              { type: "image",  name: "image",       label: "Cover Image" },
            ],
          },
        ],
      },

      // ── NEWS & MEDIA ───────────────────────────────────────────────────
      {
        name: "news",
        label: "News & Media",
        path: "_data",
        format: "yml",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        match: { include: "news" },
        fields: [
          {
            type: "object", name: "news", label: "News Items",
            list: true,
            ui: { itemProps: (item) => ({ label: item.title }) },
            fields: [
              { type: "string", name: "title",       label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "link",        label: "Link URL" },
              { type: "string", name: "link_label",  label: "Link Label", ui: { description: "e.g. Read the article." } },
            ],
          },
        ],
      },

    ],
  },
});
