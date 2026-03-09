import type { Character, Location, TimelineEvent, Verse } from '../types';

export const SEED_CHARACTERS: Character[] = [
  {
    id: '5334510e-88ca-4f62-8efc-60e0cc26a718',
    slug: 'david',
    name: 'David',
    title: 'King of Israel',
    era: 'c. 1010–970 BC',
    overview:
      'David was the second king of Israel, celebrated as a warrior, poet, and man after God\'s own heart. He united the twelve tribes and brought the Ark of the Covenant to Jerusalem.',
    // King David Playing the Harp — public domain painting (Städel Museum)
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/King_David_Playing_the_Harp_%28SM_1043%29.png/960px-King_David_Playing_the_Harp_%28SM_1043%29.png',
  },
  {
    id: 'fa63de6e-1219-4f9f-9119-3b02bef02fbb',
    slug: 'moses',
    name: 'Moses',
    title: 'Prophet & Deliverer',
    era: 'c. 1391–1271 BC',
    overview:
      'Moses led the Israelites out of slavery in Egypt, received the Ten Commandments on Mount Sinai, and guided God\'s people for forty years through the wilderness.',
    // Rembrandt "Moses with the Ten Commandments" (1659) — Gemäldegalerie, Berlin
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Rembrandt_-_Moses_with_the_Ten_Commandments_-_Google_Art_Project.jpg/960px-Rembrandt_-_Moses_with_the_Ten_Commandments_-_Google_Art_Project.jpg',
  },
  {
    id: '0b2e752f-4bc3-44a9-879e-cd9f461e363d',
    slug: 'esther',
    name: 'Esther',
    title: 'Queen of Persia',
    era: 'c. 479 BC',
    overview:
      'Esther was a Jewish queen of Persia who risked her life to save her people from genocide, demonstrating extraordinary courage and faith.',
    // Edwin Long "Queen Esther" (1878) — Google Art Project
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Edwin_Long_-_Queen_Esther_-_Google_Art_Project.jpg/960px-Edwin_Long_-_Queen_Esther_-_Google_Art_Project.jpg',
  },
  {
    id: '9633dac1-929d-4e46-9f3a-1b1cadb4c3e4',
    slug: 'paul',
    name: 'Paul',
    title: 'Apostle to the Gentiles',
    era: 'c. 5–67 AD',
    overview:
      'Originally a persecutor of Christians, Paul encountered the risen Christ and became the most prolific missionary and theological writer of the early church.',
    // El Greco "Saint Paul" (c.1598–1600) — El Greco Museum, Toledo
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/El_Greco_-_Saint_Paul.JPG/960px-El_Greco_-_Saint_Paul.JPG',
  },
  {
    id: '6421c7f8-ab93-42e2-b8d9-f52226d24447',
    slug: 'abraham',
    name: 'Abraham',
    title: 'Father of Nations',
    era: 'c. 2000–1825 BC',
    overview:
      'Abraham is revered as the founding patriarch of Judaism, Christianity, and Islam. His faith in God\'s promise made him the father of the covenant people.',
    // Rembrandt "Abraham and Isaac" (1634) — Hermitage Museum, St. Petersburg
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Rembrandt_Abraham_en_Isaac%2C_1634.jpg',
  },
];

export const SEED_LOCATIONS: Location[] = [
  {
    id: '23351cbe-efa9-4f57-8eaf-3413b5645821',
    slug: 'jerusalem',
    name: 'Jerusalem',
    description: 'The holy city central to Jewish and Christian history.',
    latitude: 31.7683,
    longitude: 35.2137,
    significance: 'Site of the Temple and the crucifixion of Jesus.',
    image_url: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=600&q=80',
  },
  {
    id: 'e2bc6ec2-5f01-40ba-971c-2180c61a88d6',
    slug: 'bethlehem',
    name: 'Bethlehem',
    description: 'Birthplace of King David and Jesus.',
    latitude: 31.7054,
    longitude: 35.2024,
    significance: 'Fulfillment of Messianic prophecy.',
    image_url: 'https://images.unsplash.com/photo-1555658636-6e4a36218be7?w=600&q=80',
  },
  {
    id: 'aa7d3e5f-5c77-4d52-95c2-02e4a2e2b41c',
    slug: 'babylon',
    name: 'Babylon',
    description: 'Capital of the Babylonian empire.',
    latitude: 32.5422,
    longitude: 44.4205,
    significance: 'Place of Israel\'s exile.',
    image_url: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=600&q=80',
  },
  {
    id: '3f2f0904-2b55-4540-b34d-b791292398ca',
    slug: 'rome',
    name: 'Rome',
    description: 'Capital of the Roman Empire.',
    latitude: 41.9028,
    longitude: 12.4964,
    significance: 'Center of early Christian mission.',
    image_url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80',
  },
  {
    id: 'f57a5039-41ab-4132-8f9a-daed3dc34e7a',
    slug: 'mount_sinai',
    name: 'Mount Sinai',
    description: 'Mountain where Moses received the Ten Commandments.',
    latitude: 28.5392,
    longitude: 33.9751,
    significance: 'Site of the covenant law.',
    image_url: 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=600&q=80',
  },
];

export const SEED_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: '53617463-ed68-4e96-be55-e616df891e46',
    slug: 'exodus',
    title: 'The Exodus',
    year_label: '1446 BC',
    year_numeric: -1446,
    description: 'Moses leads the Israelites out of Egypt.',
    location_id: 'f57a5039-41ab-4132-8f9a-daed3dc34e7a',
    category: 'exodus',
  },
  {
    id: 'c0265ccf-331c-4d47-82c1-9e1e5cec3a09',
    slug: 'david_king',
    title: 'David Becomes King',
    year_label: '1010 BC',
    year_numeric: -1010,
    description: 'David is anointed king over Israel.',
    location_id: '23351cbe-efa9-4f57-8eaf-3413b5645821',
    category: 'kingdom',
  },
  {
    id: 'bd5bda56-71c0-4b77-ba27-86c183a283dc',
    slug: 'temple_built',
    title: 'Temple Built',
    year_label: '957 BC',
    year_numeric: -957,
    description: 'Solomon completes the First Temple in Jerusalem.',
    location_id: '23351cbe-efa9-4f57-8eaf-3413b5645821',
    category: 'temple',
  },
  {
    id: '6ccbd7f8-0969-409d-a939-0071bb1c2349',
    slug: 'crucifixion',
    title: 'The Crucifixion',
    year_label: '33 AD',
    year_numeric: 33,
    description: 'Jesus is crucified and resurrected.',
    location_id: '23351cbe-efa9-4f57-8eaf-3413b5645821',
    category: 'gospel',
  },
  {
    id: '29f1ad97-d052-4dce-aa7d-e853af6fd76c',
    slug: 'pentecost',
    title: 'Pentecost',
    year_label: '33 AD',
    year_numeric: 33,
    description: 'Holy Spirit descends and the church begins.',
    location_id: '23351cbe-efa9-4f57-8eaf-3413b5645821',
    category: 'church',
  },
];

export const SEED_VERSE_OF_DAY: Verse = {
  id: 'psalm_46_10',
  reference: 'Psalm 46:10',
  text: 'Be still, and know that I am God. I will be exalted among the nations, I will be exalted in the earth!',
  book: 'Psalms',
  chapter: 46,
  verse: 10,
  testament: 'old',
};
