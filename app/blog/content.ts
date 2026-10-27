export type BlogSection = {
  heading?: string
  headingLevel?: 'h2' | 'h3'
  content?: string | string[]
  list?: string[]
  numberedList?: string[]
  note?: string
  comparison?: {
    itemA: { title: string; points: string[] }
    itemB: { title: string; points: string[] }
  }
}

export type BlogPost = {
  slug: string
  title: string
  h1: string
  date: string
  metaDescription: string
  excerpt: string
  intro: string
  sections: BlogSection[]
  closing?: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-send-wedding-invitation-on-whatsapp',
    title: 'How to Send Wedding Invitations on WhatsApp in India (Step-by-Step Guide)',
    h1: 'How to Send Wedding Invitations on WhatsApp in India (Step-by-Step Guide)',
    date: '2026-10-20',
    metaDescription:
      'Learn how to send beautiful animated wedding invitations on WhatsApp in India. Step-by-step guide for Indian couples. Share with 500 guests in minutes — starting ₹499.',
    excerpt:
      'Learn how to send beautiful animated wedding invitations on WhatsApp in India. Step-by-step guide for Indian couples. Share with 500 guests in minutes — starting ₹499.',
    intro:
      'WhatsApp is how India communicates — and increasingly, it is how Indian couples are sharing their wedding invitations. Gone are the days of printed cards arriving late or getting lost in the mail. Today, a beautiful animated digital wedding card lands directly in every guest\'s hand, instantly. Here is exactly how to do it.',
    sections: [
      {
        heading: 'Why WhatsApp Is the Best Way to Share Wedding Invites in India',
        headingLevel: 'h2',
        content:
          'With over 500 million active users in India, WhatsApp is the most used app in the country. Your guests — from your college friends to your nani — are all on WhatsApp. Sharing your wedding invitation here means instant delivery, zero printing costs, and the ability to reach outstation guests in seconds. No courier. No delays. No lost cards.',
      },
      {
        heading: 'What Format Works Best for WhatsApp Wedding Cards',
        headingLevel: 'h2',
        content: 'Not all digital invitations are equal. Here is what works best on WhatsApp:',
        list: [
          'Animated video cards: The most impressive format. Plays automatically in WhatsApp. Guests love receiving these.',
          'PDF invitations: Easy to share but look flat and boring compared to animated cards.',
          'Image cards: Simple but static — no movement, less memorable.',
        ],
        note: 'WedVibe specialises in animated wedding cards that play beautifully directly in WhatsApp — no app download needed for your guests.',
      },
      {
        heading: 'Step-by-Step: Creating and Sharing Your Wedding Card on WhatsApp',
        headingLevel: 'h2',
        numberedList: [
          'Visit wedvibe.in and browse the animated template collection',
          'Choose a design that matches your wedding theme',
          'Enter your details — bride and groom names, wedding date, venue, and pre-wedding events',
          'Complete your order at just ₹499',
          'Receive your personalised animated card within minutes',
          'Open WhatsApp, go to your contacts or broadcast list',
          'Share your card — it plays instantly for every guest',
        ],
      },
      {
        heading: 'WhatsApp Etiquette for Wedding Invitations',
        headingLevel: 'h2',
        list: [
          'Send invitations at least 3-4 weeks before the wedding',
          'Use a broadcast list so guests receive it personally rather than in a group',
          'Send a follow-up reminder 1 week before the wedding date',
          'Add a personal note with the invitation for close family',
          'For very large guest lists, organise contacts by family groups before sending',
        ],
      },
      {
        heading: 'How to Create a WhatsApp Broadcast List for Wedding Guests',
        headingLevel: 'h2',
        content: [
          'A broadcast list lets you send one message to hundreds of contacts individually — each person receives it as a personal message, not a group chat.',
          'To create one:',
        ],
        numberedList: [
          'Open WhatsApp',
          'Tap the three dots menu → New Broadcast',
          'Add your wedding guests',
          'Send your WedVibe animated card to the entire list at once',
        ],
        note: 'Note: Guests must have your number saved to receive broadcast messages.',
      },
    ],
    closing:
      'Sending your wedding invitation on WhatsApp is fast, affordable, and modern. With WedVibe\'s animated cards starting at just ₹499, your digital shaadi invitation will be the one guests screenshot and share with their own families. Start today — your perfect wedding card is just a few minutes away.',
  },
  {
    slug: 'animated-wedding-card-vs-printed-card-india',
    title: 'Animated Wedding Card vs Printed Card — Which Is Better for Indian Weddings?',
    h1: 'Animated Wedding Card vs Printed Card — Which Is Better for Indian Weddings?',
    date: '2026-10-21',
    metaDescription:
      'Animated digital wedding card vs printed card — which is better for Indian weddings? Compare cost, convenience and style. The answer might surprise you.',
    excerpt:
      'Animated digital wedding card vs printed card — which is better for Indian weddings? Compare cost, convenience and style. The answer might surprise you.',
    intro:
      'Every Indian couple faces this question during wedding planning — should we go with traditional printed cards or switch to a digital animated invitation? We break down the real comparison so you can make the right choice for your shaadi.',
    sections: [
      {
        heading: 'The True Cost of Printed Wedding Cards in India',
        headingLevel: 'h2',
        content:
          'Printed wedding cards in India typically cost between ₹15,000 and ₹50,000 for a full set, depending on design, quantity, and material. Add to that:',
        list: [
          'Design charges: ₹2,000 to ₹10,000',
          'Printing time: 7 to 15 days minimum',
          'Courier charges for outstation guests',
          'Cards that get lost, damaged, or simply thrown away',
        ],
        note: 'The total cost of a traditional printed invitation package can easily cross ₹25,000 for a mid-size wedding.',
      },
      {
        heading: 'What Are Animated Wedding Cards and How Do They Work?',
        headingLevel: 'h2',
        content: [
          'Animated digital wedding cards are video-based invitations that play directly on your guest\'s phone — no app needed. They combine beautiful motion graphics, your personal details, and elegant music into a memorable experience that arrives instantly on WhatsApp.',
          'WedVibe animated cards cost just ₹499 and are ready within minutes of ordering.',
        ],
      },
      {
        heading: 'Side by Side Comparison',
        headingLevel: 'h2',
        comparison: {
          itemA: {
            title: 'Printed Card',
            points: [
              'Cost: ₹15,000 to ₹50,000+',
              'Delivery time: 7 to 15 days',
              'Reach: Limited to physical delivery',
              'Eco impact: High paper waste',
              'Guest experience: Nice to hold, easy to lose',
              'Shareability: Cannot forward easily',
            ],
          },
          itemB: {
            title: 'Animated Digital Card (WedVibe)',
            points: [
              'Cost: ₹499',
              'Delivery time: Minutes',
              'Reach: Unlimited — share with anyone on WhatsApp',
              'Eco impact: Zero paper, zero waste',
              'Guest experience: Plays beautifully on any phone',
              'Shareability: Forward to anyone instantly',
            ],
          },
        },
      },
      {
        heading: 'Environmental Impact — The Case Against Paper Invitations',
        headingLevel: 'h2',
        content:
          'Indian weddings produce an estimated 50 million printed invitation cards every wedding season. Most end up in the bin within days. Choosing a digital wedding invitation is one of the simplest eco-friendly choices a couple can make — without sacrificing beauty or elegance.',
      },
      {
        heading: 'The Final Verdict for Modern Indian Couples',
        headingLevel: 'h2',
        content: [
          'For most Indian couples today, the smart choice is a digital animated card for wide WhatsApp distribution — and perhaps a small set of premium printed cards for immediate family only. This combination saves money, reaches more guests, and still honours tradition where it matters most.',
          'WedVibe makes the digital side effortless at just ₹499.',
        ],
      },
    ],
  },
  {
    slug: 'digital-wedding-invitation-cost-india',
    title: 'How Much Does a Digital Wedding Invitation Cost in India? 2026 Price Guide',
    h1: 'How Much Does a Digital Wedding Invitation Cost in India? 2026 Price Guide',
    date: '2026-10-22',
    metaDescription:
      'How much does a digital wedding invitation cost in India? Complete 2026 price guide comparing free and paid options. Find out why ₹499 is the sweet spot.',
    excerpt:
      'How much does a digital wedding invitation cost in India? Complete 2026 price guide comparing free and paid options. Find out why ₹499 is the sweet spot.',
    intro:
      'Digital wedding invitations have become the norm for modern Indian couples — but how much should you actually pay? This complete guide breaks down every price tier so you can make an informed decision for your shaadi.',
    sections: [
      {
        heading: 'Free Digital Invitation Platforms — The Hidden Limitations',
        headingLevel: 'h2',
        content:
          'Several free tools let you create basic digital invitations. However, free platforms typically offer:',
        list: [
          'Static image cards with no animation',
          'Generic templates with no personalisation',
          'Watermarks on the final card',
          'Poor WhatsApp compatibility',
          'No customer support',
        ],
        note: 'Free is tempting, but the result often looks cheap — which is not the impression you want to make on your wedding guests.',
      },
      {
        heading: 'Budget Digital Invitations Under ₹500 — What to Expect',
        headingLevel: 'h2',
        content: 'In the ₹299 to ₹499 range you can expect:',
        list: [
          'Animated designs with motion graphics',
          'Full personalisation with your details',
          'WhatsApp-ready format',
          'Quick turnaround within minutes',
          'Customer support',
        ],
        note: 'WedVibe sits in this range at ₹499 — offering animated cards that look premium without the premium price tag.',
      },
      {
        heading: 'Premium Digital Wedding Cards ₹500 to ₹2000',
        headingLevel: 'h2',
        content: 'Higher-priced platforms offer features like:',
        list: [
          'Custom illustration work',
          'Multiple animation styles',
          'RSVP management systems',
          'Guest list tracking',
          'Multi-language support',
        ],
        note: 'These are worth considering for very large weddings or couples who want maximum customisation.',
      },
      {
        heading: 'Custom Animated Cards — When to Invest More',
        headingLevel: 'h2',
        content:
          'For couples who want a completely unique design built from scratch, custom animated invitations can cost ₹3,000 to ₹15,000. This makes sense for destination weddings, celebrity style productions, or when the invitation itself is meant to be a keepsake.',
      },
      {
        heading: 'Why WedVibe at ₹499 Offers the Best Value in India',
        headingLevel: 'h2',
        content: 'WedVibe hits the sweet spot for most Indian couples:',
        list: [
          'Beautiful animated designs that play on WhatsApp',
          'Full personalisation included',
          'Ready within minutes',
          'No app download needed for guests',
          'Starting at just ₹499',
        ],
        note: 'For the vast majority of Indian couples planning their shaadi, WedVibe at ₹499 delivers the best combination of quality, speed, and affordability available in India today.',
      },
    ],
    closing:
      'Whatever your budget, the most important thing is that your wedding invitation reflects the joy and love of your celebration. With WedVibe, you get a stunning animated digital card your guests will remember — at a price that leaves more budget for the celebration itself.',
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}
