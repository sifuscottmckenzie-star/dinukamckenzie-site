import { defineConfig } from "tinacms";

const branch = "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  token: process.env.TINA_TOKEN!,

  build: {
    outputFolder: "admin",
    publicFolder: "./",
  },

  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "",
    },
  },

  schema: {
    collections: [

      // ── UPCOMING EVENTS ──
      {
        name: "upcoming_events",
        label: "Upcoming Events",
        path: "_data/events",
        format: "yml",
        match: { include: "upcoming" },
        fields: [
          {
            type: "object",
            name: "events",
            label: "Events",
            list: true,
            fields: [
              { type: "string", name: "day",    label: "Day" },
              { type: "string", name: "month",  label: "Month & Year" },
              { type: "string", name: "title",  label: "Event Title" },
              { type: "string", name: "venue",  label: "Venue" },
              { type: "string", name: "link",   label: "Ticket URL" },
              { type: "string", name: "button", label: "Button Label" },
            ],
          },
        ],
      },

      // ── PAST EVENTS ──
      {
        name: "past_events",
        label: "Past Events",
        path: "_data/events",
        format: "yml",
        match: { include: "past" },
        fields: [
          {
            type: "object",
            name: "years",
            label: "Years",
            list: true,
            fields: [
              { type: "string", name: "year", label: "Year" },
              {
                type: "object",
                name: "events",
                label: "Events",
                list: true,
                fields: [
                  { type: "string", name: "date",  label: "Date" },
                  { type: "string", name: "title", label: "Event Title" },
                ],
              },
            ],
          },
        ],
      },

      // ── PODCASTS ──
      {
        name: "podcasts",
        label: "Podcasts",
        path: "_data",
        format: "yml",
        match: { include: "podcasts" },
        fields: [
          {
            type: "object",
            name: "podcasts",
            label: "Podcast Episodes",
            list: true,
            fields: [
              { type: "string", name: "title",       label: "Title" },
              { type: "string", name: "description", label: "Description" },
              { type: "string", name: "link",        label: "Listen URL" },
              { type: "image",  name: "image",       label: "Cover Image" },
            ],
          },
        ],
      },

      // ── NEWS & MEDIA ──
      {
        name: "news",
        label: "News & Media",
        path: "_data",
        format: "yml",
        match: { include: "news" },
        fields: [
          {
            type: "object",
            name: "news",
            label: "News Items",
            list: true,
            fields: [
              { type: "string", name: "title",      label: "Title" },
              { type: "string", name: "link",       label: "Link URL" },
              { type: "string", name: "link_label", label: "Link Label" },
            ],
          },
        ],
      },

    ],
  },
});
