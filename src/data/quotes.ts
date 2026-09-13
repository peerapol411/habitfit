export interface MotivationQuote {
  id: string;
  quote: string;
  quoteOriginal?: string;
  author: string;
  authorRole: string;
  category: 'fitness' | 'mindset' | 'wisdom' | 'habits';
  categoryLabel: string;
}

export const MOTIVATION_QUOTES: MotivationQuote[] = [
  {
    id: 'q-1',
    quote: 'ความเจ็บปวดที่คุณรู้สึกในวันนี้ จะกลายเป็นความแข็งแกร่งที่คุณสัมผัสได้ในวันพรุ่งนี้ ทุกครั้งที่กล้ามเนื้อล้า นั่นคือจังหวะที่การเติบโตกำลังเริ่มต้น',
    quoteOriginal: 'The resistance that you fight physically in the gym and the resistance that you fight in life can only build a strong character.',
    author: 'Arnold Schwarzenegger',
    authorRole: 'แชมป์ Mr. Olympia 7 สมัย & ดาราระดับตำนาน',
    category: 'fitness',
    categoryLabel: 'วินัย & ความแข็งแกร่ง',
  },
  {
    id: 'q-2',
    quote: 'คุณไม่ได้เติบโตขึ้นไปสู่ระดับของเป้าหมายที่คุณตั้งไว้ แต่คุณจะตกลงมาอยู่ที่ระดับของระบบและวินัยที่คุณฝึกฝนในทุกๆ วัน',
    quoteOriginal: 'You do not rise to the level of your goals. You fall to the level of your systems.',
    author: 'James Clear',
    authorRole: 'ผู้เขียนหนังสือ Atomic Habits',
    category: 'habits',
    categoryLabel: 'พลังแห่งนิสัย & ระบบ',
  },
  {
    id: 'q-3',
    quote: 'ในวันที่คุณไม่อยากลุกขึ้นมาทำอะไรเลย นั่นแหละคือวันที่สำคัญที่สุดที่คุณต้องลุกขึ้นมาทำ เพราะมันคือวันที่คุณกำลังเอาชนะจิตใจตัวเอง',
    quoteOriginal: "When you think you're done, you're only at 40% of what your body is capable of doing.",
    author: 'David Goggins',
    authorRole: 'อดีตหน่วย Navy SEAL & นักวิ่งอัลตร้ามาราธอน ผู้เขียน Can\'t Hurt Me',
    category: 'fitness',
    categoryLabel: 'จิตใจเหล็กกล้า',
  },
  {
    id: 'q-4',
    quote: 'ความทุ่มเทไม่ได้วัดกันที่คำพูด แต่วัดกันที่การตื่นตีสี่มาซ้อมในขณะที่คนอื่นยังหลับ และทำมันซ้ำๆ ทุกวันจนความพยายามกลายเป็นสัญชาตญาณ',
    quoteOriginal: 'I have self-doubt. I have fear of failure. But we all do. You don\'t shrink from it, you embrace it.',
    author: 'Kobe Bryant',
    authorRole: 'ตำนาน 5 แชมป์ NBA เจ้าของแนวคิด Mamba Mentality',
    category: 'mindset',
    categoryLabel: 'Mamba Mentality',
  },
  {
    id: 'q-5',
    quote: 'ร่างกายที่แข็งแรง จิตใจที่สงบ และปัญญาที่เฉียบแหลม สิ่งเหล่านี้ไม่มีใครใช้เงินซื้อได้ คุณต้องสร้างมันขึ้นมาด้วยวินัยของตัวเองเท่านั้น',
    quoteOriginal: 'A fit body, a calm mind, a house full of love. These things cannot be bought — they must be earned.',
    author: 'Naval Ravikant',
    authorRole: 'นักคิดและนักลงทุนชื่อดัง ผู้แต่ง The Almanack of Naval Ravikant',
    category: 'wisdom',
    categoryLabel: 'ปัญญา & ความสมดุลชีวิต',
  },
  {
    id: 'q-6',
    quote: 'ในยามเช้าเมื่อคุณรู้สึกไม่อยากลุกจากเตียง จงเตือนตัวเองว่า: เราตื่นขึ้นมาเพื่อทำหน้าที่ของมนุษย์ การฝึกฝนร่างกายและจิตใจคือเกียรติยศ ไม่ใช่ภาระ',
    quoteOriginal: 'At dawn, when you have trouble getting out of bed, tell yourself: I have to go to work — as a human being.',
    author: 'Marcus Aurelius',
    authorRole: 'จักรพรรดิโรมัน & ปราชญ์สโตอิก ผู้เขียน Meditations',
    category: 'wisdom',
    categoryLabel: 'วินัยแบบสโตอิก',
  },
  {
    id: 'q-7',
    quote: 'จงเข้านอนในแต่ละคืนด้วยความรู้และสติปัญญาที่มากกว่าตอนที่คุณตื่นขึ้นมาในตอนเช้า ทำสิ่งนี้ให้เป็นนิสัย แล้วชีวิตจะพาคุณไปไกลกว่าที่ฝัน',
    quoteOriginal: 'Go to bed smarter than when you woke up. Step by step you get ahead of whatever.',
    author: 'Charlie Munger',
    authorRole: 'มหาเศรษฐีนักลงทุนระดับตำนาน คู่หูของ Warren Buffett',
    category: 'wisdom',
    categoryLabel: 'การเรียนรู้ตลอดชีวิต',
  },
  {
    id: 'q-8',
    quote: 'มีเพียงคนที่มีวินัยในตัวเองเท่านั้นที่จะเป็นอิสระได้อย่างแท้จริง หากคุณไร้วินัย คุณจะตกเป็นทาสของอารมณ์และความอยากสบายของตัวเอง',
    quoteOriginal: 'Only the disciplined ones in life are free. If you are undisciplined, you are a slave to your moods and passions.',
    author: 'Eliud Kipchoge',
    authorRole: 'มนุษย์คนแรกของโลกที่วิ่งมาราธอนต่ำกว่า 2 ชั่วโมง',
    category: 'fitness',
    categoryLabel: 'วินัยที่แท้จริง',
  },
  {
    id: 'q-9',
    quote: 'วินัยคืออิสรภาพ อย่ารอคอยให้มีอารมณ์หรือแรงจูงใจ เพราะแรงจูงใจไม่แน่นอน แต่วินัยจะพาคุณก้าวไปข้างหน้าในทุกสภาพอากาศ',
    quoteOriginal: 'Discipline equals freedom. Don\'t count on motivation; count on discipline.',
    author: 'Jocko Willink',
    authorRole: 'อดีตผู้บัญชาการหน่วย SEAL ผู้เขียน Discipline Equals Freedom',
    category: 'mindset',
    categoryLabel: 'วินัยคืออิสรภาพ',
  },
  {
    id: 'q-10',
    quote: 'ผมเกลียดทุกนาทีของการฝึกซ้อม แต่ผมบอกตัวเองว่า: อย่าเพิ่งยอมแพ้ จงยอมเหนื่อยตอนนี้ แล้วใช้ชีวิตที่เหลือในฐานะแชมเปี้ยน',
    quoteOriginal: "I hated every minute of training, but I said, 'Don't quit. Suffer now and live the rest of your life as a champion.'",
    author: 'Muhammad Ali',
    authorRole: 'แชมป์โลกมวยสากลรุ่นเฮฟวี่เวตระดับตำนาน',
    category: 'fitness',
    categoryLabel: 'หัวใจแชมเปี้ยน',
  },
  {
    id: 'q-11',
    quote: 'การเรียนรู้ไม่เคยทำให้จิตใจเหนื่อยล้า เหล็กขึ้นสนิมได้เพราะไม่ได้ใช้งาน เช่นเดียวกับสติปัญญาและร่างกายที่จะถดถอยหากเราไม่นำมาฝึกฝน',
    quoteOriginal: 'Learning never exhausts the mind. Iron rusts from disuse; so does inaction sap the vigors of the mind.',
    author: 'Leonardo da Vinci',
    authorRole: 'อัจฉริยะก้องโลกแห่งยุคเรเนสซองส์',
    category: 'wisdom',
    categoryLabel: 'การฝึกฝนปัญญา',
  },
  {
    id: 'q-12',
    quote: 'อย่าอธิษฐานขอให้ชีวิตเรียบง่ายไร้อุปสรรค แต่จงอธิษฐานขอให้ตัวเองมีความเข้มแข็งและจิตใจที่แกร่งพอจะก้าวข้ามทุกความยากลำบาก',
    quoteOriginal: 'Do not pray for an easy life, pray for the strength to endure a difficult one.',
    author: 'Bruce Lee',
    authorRole: 'ปรมาจารย์ศิลปะการต่อสู้และนักปรัชญา',
    category: 'mindset',
    categoryLabel: 'พลังใจภายใน',
  },
  {
    id: 'q-13',
    quote: 'ไม่ใช่เพราะสิ่งต่างๆ ยากลำบากเราจึงไม่กล้าลงมือทำ แต่เป็นเพราะเราไม่กล้าลงมือทำต่างหาก สิ่งเหล่านั้นจึงกลายเป็นเรื่องยากลำบาก',
    quoteOriginal: 'It is not because things are difficult that we do not dare; it is because we do not dare that they are difficult.',
    author: 'Seneca',
    authorRole: 'นักปรัชญาสโตอิกชาวโรมัน',
    category: 'wisdom',
    categoryLabel: 'ความกล้าหาญ & การลงมือทำ',
  },
  {
    id: 'q-14',
    quote: 'ผมยิงพลาดมามากกว่า 9,000 ครั้ง และแพ้มาเกือบ 300 เกม แต่ผมไม่เคยหยุดลุกขึ้นมาสู้ใหม่ และนั่นคือเหตุผลที่ทำให้ผมประสบความสำเร็จ',
    quoteOriginal: "I've failed over and over and over again in my life. And that is why I succeed.",
    author: 'Michael Jordan',
    authorRole: 'ตำนาน 6 แชมป์บาสเกตบอล NBA',
    category: 'fitness',
    categoryLabel: 'ความไม่ยอมแพ้',
  },
  {
    id: 'q-15',
    quote: 'เวลาของคุณมีจำกัด อย่าเสียเวลาไปกับการใช้ชีวิตตามแบบคนอื่น จงมีความกล้าที่จะเดินตามเสียงหัวใจและสัญชาตญาณในการพัฒนาตนเอง',
    quoteOriginal: 'Stay hungry. Stay foolish. Have the courage to follow your heart and intuition.',
    author: 'Steve Jobs',
    authorRole: 'ผู้ร่วมก่อตั้ง Apple',
    category: 'mindset',
    categoryLabel: 'ความมุ่งมั่น & วิสัยทัศน์',
  },
  {
    id: 'q-16',
    quote: 'ไม่สำคัญว่าคุณจะก้าวไปข้างหน้าช้าแค่ไหน ตราบใดที่คุณยังไม่หยุดก้าว การออกกำลังกายวันละ 15 นาที ก็ยังดีกว่าการนอนอยู่เฉยๆ ตลอดวัน',
    quoteOriginal: 'It does not matter how slowly you go as long as you do not stop.',
    author: 'Confucius (ขงจื๊อ)',
    authorRole: 'นักคิดและปรัชญาเมธีตะวันออก',
    category: 'habits',
    categoryLabel: 'ความสม่ำเสมอ',
  },
  {
    id: 'q-17',
    quote: 'คุณจะรออีกนานแค่ไหน ก่อนที่จะเรียกร้องสิ่งที่ดีที่สุดจากตัวคุณเอง? เริ่มต้นปฏิบัติต่อตัวคุณในเวอร์ชันที่ดีที่สุดตั้งแต่วินาทีนี้',
    quoteOriginal: 'How long are you going to wait before you demand the best for yourself?',
    author: 'Epictetus',
    authorRole: 'ปราชญ์สโตอิกกรีกโบราณ',
    category: 'wisdom',
    categoryLabel: 'การพัฒนาตนเองขั้นสูงสุด',
  },
  {
    id: 'q-18',
    quote: 'อุปสรรคที่ขวางทางอยู่ ไม่ได้หยุดยั้งเรา แต่มันคือเส้นทางใหม่ที่ทำให้เราแข็งแกร่งขึ้น จงใช้อุปสรรคเป็นเชื้อเพลิงในการก้าวต่อไป',
    quoteOriginal: 'The obstacle in the path becomes the path. Within every obstacle is an opportunity to improve.',
    author: 'Ryan Holiday',
    authorRole: 'ผู้เขียน The Obstacle Is the Way & Discipline Is Destiny',
    category: 'mindset',
    categoryLabel: 'เปลี่ยนอุปสรรคเป็นพลัง',
  },
  {
    id: 'q-19',
    quote: 'หากคุณต้องการสิ่งที่คุณไม่เคยมีมาก่อน คุณก็ต้องพร้อมที่จะลงมือทำในสิ่งที่คุณไม่เคยทำมาก่อนเช่นกัน',
    quoteOriginal: 'If you want something you have never had, you must be willing to do something you have never done.',
    author: 'Thomas Jefferson',
    authorRole: 'รัฐบุรุษและประธานาธิบดีสหรัฐฯ',
    category: 'mindset',
    categoryLabel: 'การก้าวออกจาก Comfort Zone',
  },
  {
    id: 'q-20',
    quote: 'สิ่งที่เรารู้สึกกลัวที่จะลงมือทำมากที่สุด มักจะเป็นสิ่งที่เราจำเป็นต้องทำมากที่สุดเพื่อการเติบโตของชีวิตและร่างกาย',
    quoteOriginal: 'What we fear doing most is usually what we most need to do.',
    author: 'Tim Ferriss',
    authorRole: 'ผู้เขียน The 4-Hour Body & Tribe of Mentors',
    category: 'habits',
    categoryLabel: 'การก้าวข้ามความกลัว',
  },
  {
    id: 'q-21',
    quote: 'สติปัญญาไม่ได้มาจากสิ่งที่คุณรู้ในโรงเรียนเพียงอย่างเดียว แต่มาจากความพยายามที่จะแสวงหาความรู้และพัฒนาตนเองตลอดทั้งชีวิต',
    quoteOriginal: 'Wisdom is not a product of schooling but of the lifelong attempt to acquire it.',
    author: 'Albert Einstein',
    authorRole: 'นักฟิสิกส์รางวัลโนเบล',
    category: 'wisdom',
    categoryLabel: 'การพัฒนาปัญญา',
  },
  {
    id: 'q-22',
    quote: 'ถ้าคุณไม่ยอมสละความสบายเพื่อแลกกับสิ่งที่คุณต้องการ สิ่งที่คุณต้องการนั่นแหละที่จะกลายเป็นสิ่งที่คุณต้องสูญเสียไป',
    quoteOriginal: 'If you don\'t sacrifice for what you want, what you want becomes the sacrifice.',
    author: 'Anonymous Stoic',
    authorRole: 'หลักคิดพัฒนาตนเอง',
    category: 'mindset',
    categoryLabel: 'การแลกเปลี่ยนเพื่อความสำเร็จ',
  },
  {
    id: 'q-23',
    quote: 'ชัยชนะที่ยิ่งใหญ่ที่สุดของมนุษย์ ไม่ใช่การเอาชนะศัตรูภายนอก แต่คือการสามารถควบคุมและเอาชนะใจตัวเองได้ในทุกๆ วัน',
    quoteOriginal: 'The first and greatest victory is to conquer yourself.',
    author: 'Plato (เพลโต)',
    authorRole: 'นักปรัชญากรีกโบราณ',
    category: 'wisdom',
    categoryLabel: 'การเอาชนะใจตนเอง',
  },
  {
    id: 'q-24',
    quote: 'การฝึกซ้อมที่หนักหน่วงไม่ได้ทรยศใคร ร่างกายจะจดจำทุกหยดเหงื่อและความพยายามที่คุณทุ่มเทลงไปเสมอ',
    quoteOriginal: 'Hard work beats talent when talent fails to work hard.',
    author: 'Tim Notke',
    authorRole: 'โค้ชบาสเกตบอลชื่อดัง',
    category: 'fitness',
    categoryLabel: 'ความพยายามไม่เคยทรยศใคร',
  },
  {
    id: 'q-25',
    quote: 'ความสุขไม่ได้ขึ้นอยู่กับว่าคุณอยู่ที่ไหน หรือมีอะไร แต่อยู่ที่ว่าคุณคิดอย่างไรและปฏิบัติต่อร่างกายกับจิตใจของตัวเองอย่างไร',
    quoteOriginal: 'The happiness of your life depends upon the quality of your thoughts.',
    author: 'Marcus Aurelius',
    authorRole: 'จักรพรรดิโรมัน & ปราชญ์สโตอิก',
    category: 'wisdom',
    categoryLabel: 'พลังแห่งความคิด',
  },
  {
    id: 'q-26',
    quote: 'การกระทำเล็กๆ ที่ทำซ้ำอย่างสม่ำเสมอทุกวัน มีพลังมากกว่าการลงมือทำครั้งใหญ่เพียงครั้งเดียวแล้วเลิกราไป',
    quoteOriginal: 'Small disciplines repeated with consistency every day lead to great achievements gained slowly over time.',
    author: 'John C. Maxwell',
    authorRole: 'ผู้เชี่ยวชาญด้านภาวะผู้นำระดับโลก',
    category: 'habits',
    categoryLabel: 'พลังของสิ่งเล็กๆ',
  },
  {
    id: 'q-27',
    quote: 'อย่าเปรียบเทียบตัวเองกับคนอื่นในวันนี้ แต่จงเปรียบเทียบตัวเองกับคนที่คุณเป็นเมื่อวานนี้ หากคุณดีขึ้นแค่วันละ 1% คุณก็ชนะแล้ว',
    quoteOriginal: 'Compare yourself to who you were yesterday, not to who someone else is today.',
    author: 'Jordan Peterson',
    authorRole: 'นักจิตวิทยาคลินิกและนักเขียนชื่อดัง',
    category: 'mindset',
    categoryLabel: 'ดีขึ้นวันละ 1%',
  },
  {
    id: 'q-28',
    quote: 'การลงทุนในความรู้และสุขภาพของตัวเอง เป็นการลงทุนที่ให้ผลตอบแทนสูงที่สุดและไม่มีใครสามารถแย่งชิงไปจากคุณได้',
    quoteOriginal: 'An investment in knowledge pays the best interest.',
    author: 'Benjamin Franklin',
    authorRole: 'รัฐบุรุษ นักประดิษฐ์ & หนึ่งในผู้สร้างชาติสหรัฐฯ',
    category: 'wisdom',
    categoryLabel: 'การลงทุนในตนเอง',
  },
  {
    id: 'q-29',
    quote: 'ความเหนื่อยล้าทางกายจะหายไปในเวลาไม่กี่ชั่วโมง แต่ความภาคภูมิใจที่คุณมีวินัยและเอาชนะความขี้เกียจได้ จะอยู่กับคุณตลอดไป',
    quoteOriginal: 'Pain is temporary. Quitting lasts forever.',
    author: 'Lance Armstrong',
    authorRole: 'นักกีฬาจักรยานทางไกลระดับโลก',
    category: 'fitness',
    categoryLabel: 'ความภาคภูมิใจในวินัย',
  },
  {
    id: 'q-30',
    quote: 'ทุกๆ เช้าคุณมีทางเลือก 2 ทาง: นอนต่อพร้อมกับความฝัน หรือตื่นขึ้นมาเพื่อลงมือทำความฝันนั้นให้กลายเป็นความจริง',
    quoteOriginal: 'Every morning you have two choices: continue to sleep with your dreams, or wake up and chase them.',
    author: 'Carmelo Anthony',
    authorRole: 'นักบาสเกตบอลระดับตำนาน NBA All-Star 10 สมัย',
    category: 'mindset',
    categoryLabel: 'ตื่นมาพิชิตเป้าหมาย',
  },
];

/**
 * Returns a deterministic daily quote based on the current calendar date (YYYY-MM-DD).
 * Every user and every device will see the exact same inspiring quote throughout that day,
 * and it will automatically cycle to a new quote the next day.
 */
export function getDailyQuote(date: Date = new Date()): MotivationQuote {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateStr = `${year}-${month}-${day}`;

  // Deterministic hash of the date string
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }

  // Shuffle salt to distribute quotes smoothly across days
  const saltedHash = Math.abs(hash * 31 + 17);
  const index = saltedHash % MOTIVATION_QUOTES.length;
  return MOTIVATION_QUOTES[index];
}
