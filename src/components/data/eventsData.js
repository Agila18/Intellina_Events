const events = {
  /* ===================== TECHNICAL EVENTS ===================== */
  technical: {
    "paper-presentation": {
      id: 1,
      title: "PAPER PRESENTATION",
      category: "technical",
      description:
        "Paper Presentation provides a scholarly platform for participants to present innovative research ideas and technical concepts. It encourages analytical thinking, structured communication, and academic excellence by allowing students to defend their work before an expert panel.",
      stages:
        `• Paper Screening
• Oral Presentation
• Q&A with Judges`,
      rules:
        `• Solo or team (up to 4 members)
• Paper must be original and unpublished
• Topics must align with approved technical domains
• Mandatory presentation at the allotted time
• Judges’ decision is final`,
      dateVenue: "April 4 | M-139, IT-211, IT-212",
      prizes: "5,000",
      image: "/assets/posters/paperpresentation.jpeg"
    },

    hackathon: {
      id: 2,
      title: "HACKATHON",
      category: "technical",
      description:
        "Hackathon is an intense innovation sprint where teams collaborate to design, develop, and deliver impactful solutions within a limited time frame. Participants transform ideas into functional prototypes while showcasing creativity, problem-solving skills, and technical expertise.",
      stages:
        `• Problem Statement Release
• Development Phase
• Final Demo & Evaluation`,
      rules:
        `• Maximum team size: 4
• No pre-built projects allowed
• Judging based on innovation and execution`,
      dateVenue: "April 4 – 5 | LBCH, IT-213",
      prizes: "5,000",
      image: "/assets/posters/Hackathon.jpeg"
    },

    rrr: {
      id: 3,
      title: "RRR – RUN RUN RUN",
      category: "technical",
      description:
        "RRR is a fast-paced coding challenge designed to test participants’ debugging accuracy, logical thinking, and coding efficiency under strict time constraints.",
      stages:
        `• Round 1: Debugging (40 Questions – 40 Minutes)
• Round 2: Coding Challenge (1 Hour – HackerRank)`,
      rules:
        `• Solo participation only
• College ID card mandatory
• Top 30 qualify for Round 2
• E-certificates for all participants`,
      dateVenue: "April 4 | M-114",
      prizes: "5,000",
      image: "/assets/posters/RRR.jpeg"
    },

    "worst-ui": {
      id: 4,
      title: "WORST UI DESIGN",
      category: "technical",
      description:
        "Worst UI Design flips traditional design principles by challenging participants to create the most confusing yet functional interface. The event highlights the importance of good UX through intentionally poor usability.",
      stages:
        `• Concept Ideation
• UI Development
• Design Explanation`,
      rules:
        `• UI must function correctly
• Poor usability must be intentional
• Submission must include explanation`,
      dateVenue: "April 5 | M-114",
      prizes: "3,000",
      image: "/assets/posters/WorstUi.jpeg"
    },

    "web-design": {
      id: 5,
      title: "WEB DESIGN",
      category: "technical",
      description:
        "Web Design challenges participants to build visually appealing, fully responsive websites from scratch, focusing on creativity, usability, and originality without templates.",
      stages:
        `• Design Brief
• Development
• Final Submission`,
      rules:
        `• Team of 2 members
• Design must be fully responsive
• Use of templates is not allowed`,
      dateVenue: "April 4 | M-114",
      prizes: "3,000",
      image: "/assets/posters/WebDesign.jpeg"
    },

    "project-expo": {
      id: 6,
      title: "PROJECT EXPO",
      category: "technical",
      description:
        "Project Expo is a grand showcase of innovation where participants present working models, prototypes, and research projects that demonstrate real-world impact and engineering excellence.",
      stages:
        `• Project Setup
• Live Demonstration
• Evaluation`,
      rules:
        `• Projects must be functional
• Clear explanation required
• Judges evaluate innovation and impact`,
      dateVenue: "April 4 – 5 | Expo Hall",
      prizes: "As per announcement",
      image: "/assets/posters/ProjectExpo.jpeg"
    }
  },

  /* ===================== FLAGSHIP EVENTS ===================== */
  flagship: {
    gptathon: {
      id: 7,
      title: "GPT-ATHON",
      category: "flagship",
      description:
        "GPT-athon is a flagship AI competition focused on prompt engineering. Participants craft powerful prompts to generate high-quality, creative, and accurate responses from AI models.",
      stages:
        `• Prompt Engineering Challenge
• AI Output Evaluation`,
      rules:
        `• Team size: 4
• Must use OpenAI GPT models
• Submissions must be original`,
      dateVenue: "April 4 | LBCH, IT-213",
      prizes: "5,000",
      image: "/assets/posters/GPTathon.jpeg"
    },

    "open-talent": {
      id: 8,
      title: "OPEN TALENT",
      category: "flagship",
      description:
        "Open Talent is a vibrant stage for participants to showcase their skills in singing, dancing, acting, comedy, or any unique performance art.",
      stages:
        `• Performance Round`,
      rules:
        `• Solo or group participation
• Time limits strictly enforced`,
      dateVenue: "April 5 | Main Stage",
      prizes: "As per announcement",
      image: "/assets/posters/OpenTalent.jpeg"
    },

    esports: {
      id: 9,
      title: "E-SPORTS",
      category: "flagship",
      description:
        "eSports brings competitive gaming to the spotlight, where participants battle in virtual arenas using strategy, reflexes, and teamwork.",
      stages:
        `• Qualifier Matches
• Semi-Finals
• Finals`,
      rules:
        `• Game-specific rules apply
• Fair play mandatory`,
      dateVenue: "April 5 | Gaming Arena",
      prizes: "As per announcement",
      image: "/assets/posters/E-Sports.jpeg"
    },

    "rapid-chess": {
      id: 10,
      title: "RAPID CHESS",
      category: "flagship",
      description:
        "Rapid Chess challenges players to think quickly and make strategic decisions under tight time controls, testing mental agility and focus.",
      stages:
        `• Knockout Rounds`,
      rules:
        `• Standard rapid chess rules
• Arbiter’s decision is final`,
      dateVenue: "April 5 | Chess Hall",
      prizes: "As per announcement",
      image: "/assets/posters/RapidChess.jpeg"
    }
  },

  /* ===================== NON-TECH EVENTS ===================== */
  "non-tech": {
    bigboss: {
      id: 11,
      title: "BIGG BOSS",
      category: "non-tech",
      description:
        "Bigg Boss is a reality-style elimination game filled with fun tasks, puzzles, strategy, and unexpected twists. Only the smartest survivor wins.",
      stages:
        `• Multiple Elimination Rounds`,
      rules:
        `• Solo participation
• Different challenges in each round`,
      dateVenue: "April 4 | LBCH",
      prizes: "3,000",
      image: "/assets/posters/BiggBoss.jpeg"
    },

    neuroquest: {
      id: 12,
      title: "NEUROQUEST",
      category: "non-tech",
      description:
        "NeuroQuest is a memory and observation challenge that tests recall speed, attention to detail, and accuracy through multiple rounds.",
      stages:
        `• Observation
• Memory Recall
• Final Challenge`,
      rules:
        `• Teams of 2–4
• No external devices allowed`,
      dateVenue: "April 4 | IT-109, IT-110",
      prizes: "2,000",
      image: "/assets/posters/NeuroQuest.jpeg"
    },

    connections: {
      id: 13,
      title: "CONNECTIONS",
      category: "non-tech",
      description:
        "Connections is a logic-driven event where participants identify hidden patterns and relationships between seemingly unrelated elements.",
      stages:
        `• Logic Rounds`,
      rules:
        `• Solo participation
• Time limit: 5 minutes per round`,
      dateVenue: "April 5 | IT-211, IT-212",
      prizes: "2,500",
      image: "/assets/posters/Connections.jpeg"
    },

    "murder-mystery": {
      id: 14,
      title: "MURDER MYSTERY",
      category: "non-tech",
      description:
        "Murder Mystery immerses participants in a thrilling investigation where clues must be analyzed and secrets uncovered before time runs out.",
      stages:
        `• Investigation
• Final Reveal`,
      rules:
        `• Team participation
• Logical reasoning required`,
      dateVenue: "April 5 | Mystery Zone",
      prizes: "As per announcement",
      image: "/assets/posters/MurderMystery.jpeg"
    },

    "ipl-auction": {
      id: 15,
      title: "IPL AUCTION",
      category: "non-tech",
      description:
        "IPL Auction simulates the excitement of a professional cricket auction, challenging teams to strategically bid and build a balanced squad.",
      stages:
        `• Auction Phase
• Team Evaluation`,
      rules:
        `• Team size: 3–4
• Max 2 overseas players
• Highest total rating wins`,
      dateVenue: "April 5 | IT-212",
      prizes: "3,000",
      image: "/assets/posters/IPLAuction.jpeg"
    },

    "treasure-hunt": {
      id: 16,
      title: "TREASURE HUNT",
      category: "non-tech",
      description:
        "Treasure Hunt is an adventurous team challenge where clues are solved sequentially to uncover hidden treasures.",
      stages:
        `• Clue Solving
• Final Discovery`,
      rules:
        `• Teams of 5
• No GPS or external tools allowed`,
      dateVenue: "April 4 | IT-109",
      prizes: "2,000",
      image: "/assets/posters/TreasureHunt.jpeg"
    }
  }
};

// Flatten for the dice roller with integrated slugs
const flattenedEvents = [
  ...Object.entries(events.technical).map(([slug, event]) => ({ ...event, slug })),
  ...Object.entries(events.flagship).map(([slug, event]) => ({ ...event, slug })),
  ...Object.entries(events["non-tech"]).map(([slug, event]) => ({ ...event, slug }))
];


export { events as eventsData };
export default flattenedEvents;