import { TemplateFormConfig } from './types'

export const defaultSchema: TemplateFormConfig = {
  slug: 'default',
  steps: [
    {
      title: 'Basic Details',
      description: 'Enter the main details for the event.',
      fields: [
        { name: 'person1_name', label: "Groom's Name 🤵", type: 'text', placeholder: "Groom's full name", required: true },
        { name: 'person2_name', label: "Bride's Name 👰", type: 'text', placeholder: "Bride's full name", required: true },
        { name: 'add_music', label: 'Add Background Music 🎵', type: 'checkbox' },
        { name: 'music_url', label: 'Custom Music URL (MP3 Link) 🔗', type: 'text', placeholder: 'e.g. https://example.com/song.mp3 (optional)' },
        { name: 'event_date', label: 'Event Date 📅', type: 'date', required: true },
        { name: 'event_time', label: 'Event Time ⏰', type: 'text', placeholder: 'e.g. 11:00 AM onwards', required: true },
      ],
    },
    {
      title: 'Venue Info',
      description: 'Where is it happening?',
      fields: [
        { name: 'venue_name', label: 'Venue Name 🏰', type: 'text', placeholder: 'e.g. Grand Palace Hall', required: true },
        { name: 'venue_address', label: 'Venue Address 📍', type: 'textarea', placeholder: 'Full physical address of the venue', rows: 3, required: true },
        { name: 'family_bride_father', label: "Bride's Father", type: 'text', placeholder: "Father's name" },
        { name: 'family_bride_mother', label: "Bride's Mother", type: 'text', placeholder: "Mother's name" },
        { name: 'family_groom_father', label: "Groom's Father", type: 'text', placeholder: "Father's name" },
        { name: 'family_groom_mother', label: "Groom's Mother", type: 'text', placeholder: "Mother's name" },
      ],
    },
    {
      title: 'Photos & Extra',
      fields: [
        { name: 'photo_urls', label: 'Photos', type: 'photo', maxPhotos: 4 },
        { name: 'extra_message', label: 'Extra Message or Note 📝', type: 'textarea', placeholder: 'e.g. No boxed gifts please.', rows: 3 },
      ],
    },
  ],
}

export const royalDarkWeddingSchema: TemplateFormConfig = {
  slug: 'royal-dark-wedding',
  steps: [
    {
      title: 'Couple Details',
      description: 'Main details about the couple.',
      fields: [
        { name: 'bride_name', label: "Bride's Name 👰", type: 'text', placeholder: 'First Name', required: true },
        { name: 'groom_name', label: "Groom's Name 🤵", type: 'text', placeholder: 'First Name', required: true },
        { name: 'add_music', label: 'Add Background Music 🎵', type: 'checkbox' },
        { name: 'music_url', label: 'Custom Music URL (MP3 Link) 🔗', type: 'text', placeholder: 'e.g. https://example.com/song.mp3 (optional)' },
        { name: 'couple_tagline', label: 'Couple Tagline 💭', type: 'text', placeholder: 'e.g. Two souls, one heart' },
        { name: 'couple_photos', label: 'Couple Photos (up to 3) 📸', type: 'photo', maxPhotos: 3 },
      ],
    },
    {
      title: 'Save the Date',
      description: 'Details for the golden foil scratch card and countdown timer.',
      fields: [
        { name: 'scratch_date', label: 'Scratch Reveal Date', type: 'date', required: true },
        { name: 'scratch_location', label: 'Scratch Reveal Subtitle', type: 'text', placeholder: 'e.g. Thursday through Saturday · Mumbai' },
        { name: 'countdown_target', label: 'Countdown Target (ISO)', type: 'text', placeholder: 'e.g. 2026-02-13T11:00:00+05:30' },
      ],
    },
    {
      title: 'Wedding Overview',
      fields: [
        { name: 'wedding_date', label: 'Main Wedding Date 📅', type: 'date', required: true },
        { name: 'wedding_time', label: 'Main Wedding Time ⏰', type: 'text', placeholder: 'e.g. 10:00 AM' },
      ],
    },
    {
      title: 'Function 1 — Haldi Ceremony',
      fields: [
        { name: 'haldi_date', label: 'Haldi Date 📅', type: 'date' },
        { name: 'haldi_time', label: 'Haldi Time ⏰', type: 'text', placeholder: 'e.g. 11:00 AM - 2:00 PM' },
        { name: 'haldi_venue_name', label: 'Haldi Venue Name 🏰', type: 'text' },
        { name: 'haldi_venue_address', label: 'Haldi Venue Address 📍', type: 'textarea', rows: 2 },
        { name: 'haldi_dress_code', label: 'Dress Code 👗', type: 'text', placeholder: 'e.g. Yellow attire welcomed' },
      ],
    },
    {
      title: 'Function 2 — Wedding',
      fields: [
        { name: 'wedding_ceremony_date', label: 'Ceremony Date 📅', type: 'date' },
        { name: 'wedding_ceremony_time', label: 'Ceremony Time ⏰', type: 'text' },
        { name: 'wedding_venue_name', label: 'Ceremony Venue Name 🏰', type: 'text' },
        { name: 'wedding_venue_address', label: 'Ceremony Venue Address 📍', type: 'textarea', rows: 2 },
        { name: 'wedding_muhurat_note', label: 'Muhurat Note 📝', type: 'text', placeholder: 'e.g. Baraat at 10 AM' },
      ],
    },
    {
      title: 'Function 3 — Reception',
      fields: [
        { name: 'reception_date', label: 'Reception Date 📅', type: 'date' },
        { name: 'reception_time', label: 'Reception Time ⏰', type: 'text' },
        { name: 'reception_venue_name', label: 'Reception Venue Name 🏰', type: 'text' },
        { name: 'reception_venue_address', label: 'Reception Venue Address 📍', type: 'textarea', rows: 2 },
        { name: 'reception_note', label: 'Note 📝', type: 'text', placeholder: 'e.g. Join us for dinner & dance' },
      ],
    },
    {
      title: 'Family Details',
      fields: [
        { name: 'bride_father_name', label: "Bride's Father", type: 'text' },
        { name: 'bride_mother_name', label: "Bride's Mother", type: 'text' },
        { name: 'bride_family_photo', label: "Bride's Family Photo", type: 'photo', maxPhotos: 1 },
        { name: 'groom_father_name', label: "Groom's Father", type: 'text' },
        { name: 'groom_mother_name', label: "Groom's Mother", type: 'text' },
        { name: 'groom_family_photo', label: "Groom's Family Photo", type: 'photo', maxPhotos: 1 },
      ],
    },
    {
      title: 'Gallery',
      description: 'Upload up to 6 memorable photos.',
      fields: [
        { name: 'gallery_photos', label: 'Gallery Photos', type: 'photo', maxPhotos: 6 },
        { name: 'gallery_caption_1', label: 'Caption 1', type: 'text' },
        { name: 'gallery_caption_2', label: 'Caption 2', type: 'text' },
        { name: 'gallery_caption_3', label: 'Caption 3', type: 'text' },
        { name: 'gallery_caption_4', label: 'Caption 4', type: 'text' },
        { name: 'gallery_caption_5', label: 'Caption 5', type: 'text' },
        { name: 'gallery_caption_6', label: 'Caption 6', type: 'text' },
      ],
    },
  ],
}

export const destinationBeachWeddingSchema: TemplateFormConfig = {
  slug: 'destination-beach-wedding',
  steps: [
    {
      title: 'Couple Details',
      description: 'Names, tagline and couple photos.',
      fields: [
        { name: 'bride_name', label: "Bride's Name 👰", type: 'text', placeholder: 'First Name', required: true },
        { name: 'groom_name', label: "Groom's Name 🤵", type: 'text', placeholder: 'First Name', required: true },
        { name: 'add_music', label: 'Add Background Music 🎵', type: 'checkbox' },
        { name: 'music_url', label: 'Custom Music URL (MP3 Link) 🔗', type: 'text', placeholder: 'e.g. https://example.com/song.mp3 (optional)' },
        { name: 'couple_tagline', label: 'Couple Tagline 💭', type: 'text', placeholder: 'e.g. Two souls, one shore' },
        { name: 'couple_photos', label: 'Couple Photos (up to 3) 📸', type: 'photo', maxPhotos: 3 },
      ],
    },
    {
      title: 'Wedding Date',
      description: 'Main event date shown in the scratch card and countdown timer.',
      fields: [
        { name: 'wedding_date', label: 'Main Wedding Date 📅', type: 'date', required: true },
        { name: 'wedding_date_label', label: 'Date Subtitle', type: 'text', placeholder: 'e.g. Friday through Sunday · Goa' },
        { name: 'countdown_target', label: 'Countdown Target (ISO datetime) ⏱️', type: 'text', placeholder: 'e.g. 2026-11-21T17:30:00+05:30' },
        { name: 'footer_date', label: 'Footer Date Line', type: 'text', placeholder: 'e.g. 20–22 · November · 2026 · Goa' },
      ],
    },
    {
      title: 'Function 1 — Haldi',
      fields: [
        { name: 'haldi_date', label: 'Haldi Date 📅', type: 'date' },
        { name: 'haldi_time', label: 'Haldi Time ⏰', type: 'text', placeholder: 'e.g. 10:00 AM – 1:00 PM' },
        { name: 'haldi_venue_name', label: 'Haldi Venue Name 🏖️', type: 'text' },
        { name: 'haldi_venue_address', label: 'Haldi Venue Address 📍', type: 'textarea', rows: 2 },
        { name: 'haldi_dress_code', label: 'Dress Code 👗', type: 'text', placeholder: 'e.g. Yellow attire welcomed 🌼' },
      ],
    },
    {
      title: 'Function 2 — Wedding',
      fields: [
        { name: 'wedding_ceremony_date', label: 'Ceremony Date 📅', type: 'date' },
        { name: 'wedding_ceremony_time', label: 'Ceremony Time ⏰', type: 'text', placeholder: 'e.g. 5:30 PM – 7:00 PM' },
        { name: 'wedding_venue_name', label: 'Ceremony Venue Name 🏰', type: 'text' },
        { name: 'wedding_venue_address', label: 'Ceremony Venue Address 📍', type: 'textarea', rows: 2 },
        { name: 'wedding_muhurat_note', label: 'Muhurat Note 📝', type: 'text', placeholder: 'e.g. Auspicious muhurat as per panditji' },
      ],
    },
    {
      title: 'Function 3 — Reception',
      fields: [
        { name: 'reception_date', label: 'Reception Date 📅', type: 'date' },
        { name: 'reception_time', label: 'Reception Time ⏰', type: 'text' },
        { name: 'reception_venue_name', label: 'Reception Venue Name 🏖️', type: 'text' },
        { name: 'reception_venue_address', label: 'Reception Venue Address 📍', type: 'textarea', rows: 2 },
        { name: 'reception_note', label: 'Note 📝', type: 'text', placeholder: 'e.g. Dinner, dance & celebrations till late' },
      ],
    },
    {
      title: 'Gallery',
      description: 'Upload up to 6 memorable photos and add captions.',
      fields: [
        { name: 'gallery_photos', label: 'Gallery Photos (up to 6) 📸', type: 'photo', maxPhotos: 6 },
        { name: 'gallery_caption_1', label: 'Caption 1', type: 'text', placeholder: 'e.g. Where it began' },
        { name: 'gallery_caption_2', label: 'Caption 2', type: 'text', placeholder: 'e.g. Sun-kissed' },
        { name: 'gallery_caption_3', label: 'Caption 3', type: 'text', placeholder: 'e.g. Toes in the sand' },
        { name: 'gallery_caption_4', label: 'Caption 4', type: 'text', placeholder: 'e.g. Golden hour' },
        { name: 'gallery_caption_5', label: 'Caption 5', type: 'text', placeholder: 'e.g. Just us, always' },
        { name: 'gallery_caption_6', label: 'Caption 6', type: 'text', placeholder: 'e.g. Forever begins here' },
      ],
    },
    {
      title: 'Family Details',
      fields: [
        { name: 'bride_father_name', label: "Bride's Father", type: 'text' },
        { name: 'bride_mother_name', label: "Bride's Mother", type: 'text' },
        { name: 'bride_family_photo', label: "Bride's Family Photo", type: 'photo', maxPhotos: 1 },
        { name: 'groom_father_name', label: "Groom's Father", type: 'text' },
        { name: 'groom_mother_name', label: "Groom's Mother", type: 'text' },
        { name: 'groom_family_photo', label: "Groom's Family Photo", type: 'photo', maxPhotos: 1 },
      ],
    },
  ],
}

export const vintageStoryBookSchema: TemplateFormConfig = {
  slug: 'vintage-story-book-wedding',
  steps: [
    {
      title: 'Couple Details',
      description: 'Names and photos for the storybook.',
      fields: [
        { name: 'bride_name', label: "Bride's Name 👰", type: 'text', placeholder: 'First Name', required: true },
        { name: 'groom_name', label: "Groom's Name 🤵", type: 'text', placeholder: 'First Name', required: true },
        { name: 'add_music', label: 'Add Background Music 🎵', type: 'checkbox' },
        { name: 'music_url', label: 'Custom Music URL (MP3 Link) 🔗', type: 'text', placeholder: 'e.g. https://example.com/song.mp3 (optional)' },
        { name: 'couple_photos', label: 'Couple Photos (up to 2) 📸', type: 'photo', maxPhotos: 2 },
      ],
    },
    {
      title: 'Save the Date',
      description: 'Scratch card and countdown timer details.',
      fields: [
        { name: 'scratch_date', label: 'Scratch Reveal Date 📅', type: 'text', placeholder: 'e.g. 20 NOVEMBER 2026', required: true },
        { name: 'scratch_location', label: 'Scratch Reveal Subtitle', type: 'text', placeholder: 'e.g. Mumbai · With Love' },
        { name: 'countdown_target', label: 'Countdown Target (ISO datetime) ⏱️', type: 'text', placeholder: 'e.g. 2026-11-21T17:00:00+05:30' },
      ],
    },
    {
      title: 'Function 1 — Haldi',
      fields: [
        { name: 'haldi_date', label: 'Haldi Date 📅', type: 'date' },
        { name: 'haldi_time', label: 'Haldi Time ⏰', type: 'text', placeholder: 'e.g. 10:00 AM' },
        { name: 'haldi_venue_name', label: 'Haldi Venue Name 🏰', type: 'text' },
        { name: 'haldi_dress_code', label: 'Dress Code 👗', type: 'text', placeholder: 'e.g. Yellow attire welcomed 🌼' },
      ],
    },
    {
      title: 'Function 2 — Wedding',
      fields: [
        { name: 'wedding_ceremony_date', label: 'Ceremony Date 📅', type: 'date' },
        { name: 'wedding_ceremony_time', label: 'Ceremony Time ⏰', type: 'text', placeholder: 'e.g. 5:00 PM' },
        { name: 'wedding_venue_name', label: 'Ceremony Venue Name 🏰', type: 'text' },
        { name: 'wedding_muhurat_note', label: 'Muhurat Note 📝', type: 'text', placeholder: 'e.g. Auspicious muhurat as per panditji' },
      ],
    },
    {
      title: 'Function 3 — Reception',
      fields: [
        { name: 'reception_date', label: 'Reception Date 📅', type: 'date' },
        { name: 'reception_time', label: 'Reception Time ⏰', type: 'text', placeholder: 'e.g. 8:00 PM' },
        { name: 'reception_venue_name', label: 'Reception Venue Name 🏰', type: 'text' },
        { name: 'reception_note', label: 'Note 📝', type: 'text', placeholder: 'e.g. Dinner, dance & celebrations till late' },
      ],
    },
    {
      title: 'Family Details',
      fields: [
        { name: 'bride_father_name', label: "Bride's Father", type: 'text' },
        { name: 'bride_mother_name', label: "Bride's Mother", type: 'text' },
        { name: 'bride_family_photo', label: "Bride's Family Photo", type: 'photo', maxPhotos: 1 },
        { name: 'groom_father_name', label: "Groom's Father", type: 'text' },
        { name: 'groom_mother_name', label: "Groom's Mother", type: 'text' },
        { name: 'groom_family_photo', label: "Groom's Family Photo", type: 'photo', maxPhotos: 1 },
      ],
    },
    {
      title: 'Gallery & Ending',
      description: 'Upload up to 4 memorable photos and ending details.',
      fields: [
        { name: 'gallery_photos', label: 'Gallery Photos (up to 4) 📸', type: 'photo', maxPhotos: 4 },
        { name: 'gallery_caption_1', label: 'Caption 1', type: 'text', placeholder: 'e.g. Where it began' },
        { name: 'gallery_caption_2', label: 'Caption 2', type: 'text', placeholder: 'e.g. Golden hour' },
        { name: 'gallery_caption_3', label: 'Caption 3', type: 'text', placeholder: 'e.g. Just us' },
        { name: 'gallery_caption_4', label: 'Caption 4', type: 'text', placeholder: 'e.g. Forever begins' },
        { name: 'end_date', label: 'Ending Date Line', type: 'text', placeholder: 'e.g. 20–21 · November · 2026 · Mumbai' },
      ],
    },
  ],
}




export const emeraldNikkahWeddingSchema: TemplateFormConfig = {
  slug: 'emerald-nikkah-wedding',
  steps: [
    {
      title: 'Couple Details',
      description: 'Names and photos for the Nikkah.',
      fields: [
        { name: 'bride_name', label: "Bride's Name 👰", type: 'text', placeholder: 'First Name', required: true },
        { name: 'groom_name', label: "Groom's Name 🤵", type: 'text', placeholder: 'First Name', required: true },
        { name: 'add_music', label: 'Add Background Music 🎵', type: 'checkbox' },
        { name: 'music_url', label: 'Custom Music URL (MP3 Link) 🔗', type: 'text', placeholder: 'e.g. https://example.com/song.mp3 (optional)' },
        { name: 'couple_photos', label: 'Couple Photos (up to 3) 📸', type: 'photo', maxPhotos: 3 },
      ],
    },
    {
      title: 'Save the Date',
      description: 'Scratch card and countdown timer details.',
      fields: [
        { name: 'scratch_date', label: 'Scratch Reveal Date 📅', type: 'date', required: true },
        { name: 'scratch_location', label: 'Scratch Reveal Subtitle', type: 'text', placeholder: 'e.g. After Asr Prayer · Walima To Follow' },
        { name: 'countdown_target', label: 'Countdown Target (ISO datetime) ⏱️', type: 'text', placeholder: 'e.g. 2026-03-14T16:00:00+05:30' },
      ],
    },
    {
      title: 'Functions — Tickets',
      description: 'Details for Haldi, Nikkah and Walima.',
      fields: [
        { name: 'haldi_date', label: 'Haldi Date 📅', type: 'date', required: false },
        { name: 'haldi_time', label: 'Haldi Time ⏰', type: 'text', placeholder: 'e.g. 10:00 AM – 1:00 PM' },
        { name: 'haldi_venue_name', label: 'Haldi Venue 🏰', type: 'text', placeholder: 'e.g. Al-Noor Banquet Hall' },
        { name: 'haldi_dress_code', label: 'Dress Code 👗', type: 'text', placeholder: 'e.g. Yellow attire welcomed 🌼' },

        { name: 'nikkah_date', label: 'Nikkah Date 📅', type: 'date', required: false },
        { name: 'nikkah_time', label: 'Nikkah Time ⏰', type: 'text', placeholder: 'e.g. After Asr Prayer' },
        { name: 'nikkah_venue_name', label: 'Nikkah Venue 🏰', type: 'text', placeholder: 'e.g. Masjid Al-Falah' },
        { name: 'nikkah_venue_address', label: 'Address 📍', type: 'text', placeholder: 'e.g. 221 Crescent Ave, NY 10021' },

        { name: 'walima_date', label: 'Walima Date 📅', type: 'date', required: false },
        { name: 'walima_time', label: 'Walima Time ⏰', type: 'text', placeholder: 'e.g. 7:00 PM Onwards' },
        { name: 'walima_venue_name', label: 'Walima Venue 🏰', type: 'text', placeholder: 'e.g. Al-Noor Banquet Hall' },
        { name: 'walima_note', label: 'Note 📝', type: 'text', placeholder: 'e.g. Dinner & celebration for all guests' },
      ],
    },
    {
      title: 'Family Details',
      fields: [
        { name: 'bride_father_name', label: "Bride's Father", type: 'text' },
        { name: 'bride_mother_name', label: "Bride's Mother", type: 'text' },
        { name: 'bride_family_photo', label: "Bride's Family Photo", type: 'photo', maxPhotos: 1 },
        { name: 'groom_father_name', label: "Groom's Father", type: 'text' },
        { name: 'groom_mother_name', label: "Groom's Mother", type: 'text' },
        { name: 'groom_family_photo', label: "Groom's Family Photo", type: 'photo', maxPhotos: 1 },
      ],
    },
    {
      title: 'Gallery & Ending',
      description: 'Upload up to 6 memorable photos for the scrapbook.',
      fields: [
        { name: 'gallery_photos', label: 'Gallery Photos (up to 6) 📸', type: 'photo', maxPhotos: 6 },
        { name: 'gallery_caption_1', label: 'Caption 1', type: 'text', placeholder: 'e.g. Where it began' },
        { name: 'gallery_caption_2', label: 'Caption 2', type: 'text', placeholder: 'e.g. Family duas' },
        { name: 'gallery_caption_3', label: 'Caption 3', type: 'text', placeholder: 'e.g. Haldi morning' },
        { name: 'gallery_caption_4', label: 'Caption 4', type: 'text', placeholder: 'e.g. Golden hour' },
        { name: 'gallery_caption_5', label: 'Caption 5', type: 'text', placeholder: 'e.g. Just us, always' },
        { name: 'gallery_caption_6', label: 'Caption 6', type: 'text', placeholder: 'e.g. Forever begins here' },
        { name: 'end_date', label: 'Ending Date Line', type: 'text', placeholder: 'e.g. 13–15 · March · 2026 · New York' },
      ],
    },
  ],
}


export const classicMaroonWeddingSchema: TemplateFormConfig = {
  slug: 'classic-maroon-wedding',
  steps: [
    {
      title: 'Couple Details',
      description: 'Names, tagline and couple photos.',
      fields: [
        { name: 'bride_name', label: "Bride's Name 👰", type: 'text', placeholder: 'First Name', required: true },
        { name: 'groom_name', label: "Groom's Name 🤵", type: 'text', placeholder: 'First Name', required: true },
        { name: 'add_music', label: 'Add Background Music 🎵', type: 'checkbox' },
        { name: 'music_url', label: 'Custom Music URL (MP3 Link) 🔗', type: 'text', placeholder: 'e.g. https://example.com/song.mp3 (optional)' },
        { name: 'couple_tagline', label: 'Couple Tagline 💭', type: 'text', placeholder: "e.g. We're getting married" },
        { name: 'couple_photos', label: 'Couple Photos (up to 3) 📸', type: 'photo', maxPhotos: 3 },
      ],
    },
    {
      title: 'Save the Date',
      description: 'Scratch card and countdown timer details.',
      fields: [
        { name: 'scratch_date', label: 'Scratch Reveal Date 📅', type: 'date', required: true },
        { name: 'scratch_location', label: 'Scratch Reveal Subtitle', type: 'text', placeholder: 'e.g. At An Auspicious Hour · Reception To Follow' },
        { name: 'countdown_target', label: 'Countdown Target (ISO datetime) ⏱️', type: 'text', placeholder: 'e.g. 2026-02-20T16:00:00+05:30' },
      ],
    },
    {
      title: 'Function 1 — Haldi',
      fields: [
        { name: 'haldi_date', label: 'Haldi Date 📅', type: 'date', required: false },
        { name: 'haldi_time', label: 'Haldi Time ⏰', type: 'text', placeholder: 'e.g. 10:00 AM – 1:00 PM' },
        { name: 'haldi_venue_name', label: 'Haldi Venue Name 🏰', type: 'text' },
        { name: 'haldi_dress_code', label: 'Dress Code 👗', type: 'text', placeholder: 'e.g. Yellow attire welcomed 🌼' },
      ],
    },
    {
      title: 'Function 2 — Wedding',
      fields: [
        { name: 'wedding_date', label: 'Ceremony Date 📅', type: 'date', required: true },
        { name: 'wedding_time', label: 'Ceremony Time ⏰', type: 'text', placeholder: 'e.g. 4:00 PM Onwards' },
        { name: 'wedding_venue_name', label: 'Ceremony Venue Name 🏰', type: 'text' },
        { name: 'wedding_venue_address', label: 'Ceremony Venue Address 📍', type: 'textarea', rows: 2 },
      ],
    },
    {
      title: 'Function 3 — Reception',
      fields: [
        { name: 'reception_date', label: 'Reception Date 📅', type: 'date', required: false },
        { name: 'reception_time', label: 'Reception Time ⏰', type: 'text', placeholder: 'e.g. 7:00 PM Onwards' },
        { name: 'reception_venue_name', label: 'Reception Venue Name 🏰', type: 'text' },
        { name: 'reception_note', label: 'Note 📝', type: 'text', placeholder: 'e.g. Dinner, dance & celebrations' },
      ],
    },
    {
      title: 'Gallery',
      description: 'Upload up to 6 memorable photos and add captions.',
      fields: [
        { name: 'gallery_photos', label: 'Gallery Photos (up to 6) 📸', type: 'photo', maxPhotos: 6 },
        { name: 'gallery_caption_1', label: 'Caption 1', type: 'text', placeholder: 'e.g. Where it began' },
        { name: 'gallery_caption_2', label: 'Caption 2', type: 'text', placeholder: 'e.g. First bouquet' },
        { name: 'gallery_caption_3', label: 'Caption 3', type: 'text', placeholder: 'e.g. Haldi morning' },
        { name: 'gallery_caption_4', label: 'Caption 4', type: 'text', placeholder: 'e.g. Golden hour' },
        { name: 'gallery_caption_5', label: 'Caption 5', type: 'text', placeholder: 'e.g. Just us, always' },
        { name: 'gallery_caption_6', label: 'Caption 6', type: 'text', placeholder: 'e.g. Forever begins here' },
      ],
    },
    {
      title: 'Family & Ending',
      fields: [
        { name: 'bride_father_name', label: "Bride's Father", type: 'text' },
        { name: 'bride_mother_name', label: "Bride's Mother", type: 'text' },
        { name: 'bride_family_photo', label: "Bride's Family Photo", type: 'photo', maxPhotos: 1 },
        { name: 'groom_father_name', label: "Groom's Father", type: 'text' },
        { name: 'groom_mother_name', label: "Groom's Mother", type: 'text' },
        { name: 'groom_family_photo', label: "Groom's Family Photo", type: 'photo', maxPhotos: 1 },
        { name: 'end_date', label: 'Ending Date Line 📅', type: 'date', required: false },
      ],
    },
  ],
}

export const ourWeddingStorySchema: TemplateFormConfig = {
  slug: 'our-wedding-story',
  steps: [
    {
      title: 'Couple Details',
      description: 'Names, tagline and couple photos.',
      fields: [
        { name: 'bride_name', label: "Bride's Name 👰", type: 'text', placeholder: 'First Name', required: true },
        { name: 'groom_name', label: "Groom's Name 🤵", type: 'text', placeholder: 'First Name', required: true },
        { name: 'add_music', label: 'Add Background Music 🎵', type: 'checkbox' },
        { name: 'music_url', label: 'Custom Music URL (MP3 Link) 🔗', type: 'text', placeholder: 'e.g. https://example.com/song.mp3 (optional)' },
        { name: 'couple_tagline', label: 'Couple Tagline 💭', type: 'text', placeholder: "e.g. Two families, one celebration" },
        { name: 'couple_photos', label: 'Couple Photos (up to 2) 📸', type: 'photo', maxPhotos: 2 },
      ],
    },
    {
      title: 'Save the Date',
      description: 'Hero details.',
      fields: [
        { name: 'end_date', label: 'Date 📅', type: 'date', required: true },
        { name: 'scratch_location', label: 'Location', type: 'text', placeholder: 'e.g. Mumbai' },
      ],
    },
    {
      title: 'Function 1 — Haldi',
      fields: [
        { name: 'haldi_date', label: 'Haldi Date 📅', type: 'date' },
        { name: 'haldi_time', label: 'Haldi Time ⏰', type: 'text', placeholder: 'e.g. 10:00 AM – 1:00 PM' },
        { name: 'haldi_venue_name', label: 'Haldi Venue Name 🏰', type: 'text' },
        { name: 'haldi_venue_address', label: 'Haldi Venue Address 📍', type: 'textarea', rows: 2 },
        { name: 'haldi_dress_code', label: 'Dress Code 👗', type: 'text', placeholder: 'e.g. Yellow attire welcomed' },
      ],
    },
    {
      title: 'Function 2 — Wedding',
      fields: [
        { name: 'wedding_date', label: 'Ceremony Date 📅', type: 'date' },
        { name: 'wedding_time', label: 'Ceremony Time ⏰', type: 'text', placeholder: 'e.g. 11:00 AM – 1:30 PM' },
        { name: 'wedding_venue_name', label: 'Ceremony Venue Name 🏰', type: 'text' },
        { name: 'wedding_venue_address', label: 'Ceremony Venue Address 📍', type: 'textarea', rows: 2 },
        { name: 'wedding_muhurat_note', label: 'Muhurat Note 📝', type: 'text', placeholder: 'e.g. Muhurat as per pandit' },
      ],
    },
    {
      title: 'Function 3 — Reception',
      fields: [
        { name: 'reception_date', label: 'Reception Date 📅', type: 'date' },
        { name: 'reception_time', label: 'Reception Time ⏰', type: 'text', placeholder: 'e.g. 7:00 PM Onwards' },
        { name: 'reception_venue_name', label: 'Reception Venue Name 🏰', type: 'text' },
        { name: 'reception_venue_address', label: 'Reception Venue Address 📍', type: 'textarea', rows: 2 },
        { name: 'reception_note', label: 'Note 📝', type: 'text', placeholder: 'e.g. Dinner, dance & celebrations' },
      ],
    },
    {
      title: 'Gallery',
      description: 'Upload up to 6 memorable photos and add captions.',
      fields: [
        { name: 'gallery_photos', label: 'Gallery Photos (up to 6) 📸', type: 'photo', maxPhotos: 6 },
        { name: 'gallery_caption_1', label: 'Caption 1', type: 'text', placeholder: 'e.g. Where it began' },
        { name: 'gallery_caption_2', label: 'Caption 2', type: 'text', placeholder: 'e.g. First bouquet' },
        { name: 'gallery_caption_3', label: 'Caption 3', type: 'text', placeholder: 'e.g. Haldi morning' },
        { name: 'gallery_caption_4', label: 'Caption 4', type: 'text', placeholder: 'e.g. Mehendi vibes' },
        { name: 'gallery_caption_5', label: 'Caption 5', type: 'text', placeholder: 'e.g. Our engagement' },
        { name: 'gallery_caption_6', label: 'Caption 6', type: 'text', placeholder: 'e.g. Say yes' },
      ],
    },
    {
      title: 'Family',
      fields: [
        { name: 'bride_father_name', label: "Bride's Father", type: 'text' },
        { name: 'bride_mother_name', label: "Bride's Mother", type: 'text' },
        { name: 'groom_father_name', label: "Groom's Father", type: 'text' },
        { name: 'groom_mother_name', label: "Groom's Mother", type: 'text' },
      ],
    },
  ],
}



export const engagementNavyStorySchema: TemplateFormConfig = {
  slug: 'engagement-navy-story',
  steps: [
    {
      title: 'Couple Details',
      description: 'Names of the couple getting engaged.',
      fields: [
        { name: 'person1_name', label: "Person 1's Name 💍", type: 'text', placeholder: 'e.g. Kabir', required: true },
        { name: 'person2_name', label: "Person 2's Name 💍", type: 'text', placeholder: 'e.g. Simran', required: true },
        { name: 'add_music', label: 'Add Background Music 🎵', type: 'checkbox' },
        { name: 'music_url', label: 'Custom Music URL (MP3 Link) 🔗', type: 'text', placeholder: 'e.g. https://example.com/song.mp3 (optional)' },
      ],
    },
    {
      title: 'Engagement Details',
      description: 'When and where is the engagement celebration?',
      fields: [
        { name: 'event_date', label: 'Engagement Date 📅', type: 'date', required: true },
        { name: 'venue_name', label: 'Venue Name 🏰', type: 'text', placeholder: 'e.g. The Grand Ballroom', required: true },
        { name: 'venue_address', label: 'Venue Address 📍', type: 'textarea', placeholder: 'Full address of the venue', rows: 3 },
      ],
    },
    {
      title: 'Our Story & Photos',
      description: 'Share your love story and memorable photos.',
      fields: [
        { name: 'extra_message', label: 'Our Story 💌', type: 'textarea', placeholder: 'Write a short message about your love story…', rows: 4 },
        { name: 'photo_urls', label: 'Photos (up to 4) 📸', type: 'photo', maxPhotos: 4 },
      ],
    },
  ],
}

export const birthdayLoveCardSchema: TemplateFormConfig = {
  slug: 'birthday-love-card',
  steps: [
    {
      title: 'Names & Date',
      description: 'Who is this card for, and who is sending it?',
      fields: [
        { name: 'recipient_name', label: "Recipient's Name 🎂", type: 'text', placeholder: 'e.g. Priya, Arjun…', required: true },
        { name: 'sender_name', label: 'Your Name 💌', type: 'text', placeholder: 'Your name', required: true },
        { name: 'birthday_date', label: 'Birthday Date 📅', type: 'date', required: true },
        { name: 'hero_eyebrow', label: 'Top Tagline', type: 'text', placeholder: 'e.g. A little something for you' },
        { name: 'hero_tagline', label: 'Hero Subtitle', type: 'text', placeholder: 'e.g. To the one who makes my heart skip a beat…' },
        { name: 'couple_photos', label: 'Your / Couple Photos (up to 3) 📸', type: 'photo', maxPhotos: 3 },
        { name: 'add_music', label: 'Add Background Music 🎵', type: 'checkbox' },
        { name: 'music_url', label: 'Custom Music URL (MP3 Link) 🔗', type: 'text', placeholder: 'e.g. https://example.com/song.mp3 (optional)' },
      ],
    },
    {
      title: 'Love Letter',
      description: 'Write a heartfelt letter and flip-card reasons.',
      fields: [
        { name: 'letter_greeting', label: 'Letter Greeting ✍️', type: 'text', placeholder: 'e.g. My Dearest Love,' },
        { name: 'letter_body', label: 'Letter Body 💬', type: 'textarea', rows: 6, placeholder: 'Write your heartfelt message here…' },
        { name: 'letter_sign', label: 'Letter Sign-off', type: 'text', placeholder: 'e.g. Forever yours, with all my love' },
        { name: 'reason_1', label: 'Reason #1 💕', type: 'text', placeholder: 'e.g. The way your eyes light up…' },
        { name: 'reason_2', label: 'Reason #2 💕', type: 'text', placeholder: 'e.g. How you remember every tiny detail…' },
        { name: 'reason_3', label: 'Reason #3 💕', type: 'text', placeholder: 'e.g. Your hugs that make the world feel safe…' },
        { name: 'reason_4', label: 'Reason #4 💕', type: 'text', placeholder: 'e.g. Just… you. All of you.' },
      ],
    },
    {
      title: 'Memories',
      description: 'Add captions for your shared memory photos.',
      fields: [
        { name: 'gallery_photos', label: 'Memory Photos (up to 6) 🖼️', type: 'photo', maxPhotos: 6 },
        { name: 'mem1_caption', label: 'Memory 1 Caption', type: 'text', placeholder: 'e.g. The Day We Met' },
        { name: 'mem1_date', label: 'Memory 1 Subtitle', type: 'text', placeholder: 'e.g. Where it all began' },
        { name: 'mem2_caption', label: 'Memory 2 Caption', type: 'text', placeholder: 'e.g. Our First Date' },
        { name: 'mem2_date', label: 'Memory 2 Subtitle', type: 'text', placeholder: 'e.g. Nervous laughs & stolen glances' },
        { name: 'mem3_caption', label: 'Memory 3 Caption', type: 'text', placeholder: 'e.g. That Coffee Shop' },
        { name: 'mem3_date', label: 'Memory 3 Subtitle', type: 'text', placeholder: 'e.g. Our little corner of the world' },
        { name: 'mem4_caption', label: 'Memory 4 Caption', type: 'text', placeholder: 'e.g. Our First Trip' },
        { name: 'mem4_date', label: 'Memory 4 Subtitle', type: 'text', placeholder: 'e.g. Getting lost & finding ourselves' },
        { name: 'mem5_caption', label: 'Memory 5 Caption', type: 'text', placeholder: 'e.g. Sunset Together' },
        { name: 'mem5_date', label: 'Memory 5 Subtitle', type: 'text', placeholder: 'e.g. Golden hour with you' },
        { name: 'mem6_caption', label: 'Memory 6 Caption', type: 'text', placeholder: 'e.g. Just Us, Always' },
        { name: 'mem6_date', label: 'Memory 6 Subtitle', type: 'text', placeholder: 'e.g. My favourite photo in the world' },
      ],
    },
    {
      title: 'Wish & Promise',
      description: 'Final personal touches.',
      fields: [
        { name: 'candle_wish', label: 'Birthday Wish 🕯️', type: 'textarea', rows: 3, placeholder: 'e.g. May this year bring you all the joy you deserve…' },
        { name: 'promise_icon', label: 'Promise Icon ✨', type: 'text', placeholder: 'e.g. 💍 or 🌹 or ✨' },
        { name: 'promise_text', label: 'Promise / Closing Message', type: 'textarea', rows: 4, placeholder: 'e.g. I promise to be there for every birthday, every adventure…' },
      ],
    },
  ],
}

export const templateSchemas: Record<string, TemplateFormConfig> = {
  'royal-dark-wedding': royalDarkWeddingSchema,
  'destination-beach-wedding': destinationBeachWeddingSchema,
  'vintage-story-book-wedding': vintageStoryBookSchema,
  'emerald-nikkah-wedding': emeraldNikkahWeddingSchema,
  'classic-maroon-wedding': classicMaroonWeddingSchema,
  'our-wedding-story': ourWeddingStorySchema,
  'engagement-navy-story': engagementNavyStorySchema,
  'birthday-love-card': birthdayLoveCardSchema,
}

export function getSchemaForTemplate(slug: string): TemplateFormConfig {
  return templateSchemas[slug] || defaultSchema
}

// A helper to initialize formData from a schema
export function generateInitialData(schema: TemplateFormConfig): Record<string, any> {
  const data: Record<string, any> = {
    person1_name: '',
    person2_name: '',
    event_date: '',
    event_time: '',
    venue_name: '',
    venue_address: '',
    family_bride_father: '',
    family_bride_mother: '',
    family_groom_father: '',
    family_groom_mother: '',
    extra_message: '',
    photo_urls: [],
  }
  
  schema.steps.forEach(step => {
    step.fields.forEach(field => {
      if (field.type === 'photo') {
        if (!data[field.name]) data[field.name] = []
      } else if (field.type === 'checkbox') {
        if (typeof data[field.name] === 'undefined') data[field.name] = true
      } else {
        if (typeof data[field.name] === 'undefined') {
          data[field.name] = ''
        }
      }
    })
  })
  
  return data
}
