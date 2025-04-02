export const navigationLinks = [
  {
    href: "/library",
    label: "Library",
  },

  {
    img: "/icons/user.svg",
    selectedImg: "/icons/user-fill.svg",
    href: "/my-profile",
    label: "My Profile",
  },
];

export const adminSideBarLinks = [
  {
    img: "/icons/admin/home.svg",
    route: "/admin",
    text: "Home",
  },
  {
    img: "/icons/admin/users.svg",
    route: "/admin/users",
    text: "All Users",
  },
  {
    img: "/icons/admin/book.svg",
    route: "/admin/books",
    text: "All Books",
  },
  {
    img: "/icons/admin/bookmark.svg",
    route: "/admin/book-requests",
    text: "Borrow Requests",
  },
  {
    img: "/icons/admin/user.svg",
    route: "/admin/account-requests",
    text: "Account Requests",
  },
];

export const FIELD_NAMES = {
  fullName: "Full name",
  email: "Email",
  universityId: "University ID Number",
  password: "Password",
  universityCard: "Upload University ID Card",
};

export const FIELD_TYPES = {
  fullName: "text",
  email: "email",
  universityId: "text",
  password: "password",
};

export const sampleBooks = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fantasy / Fiction",
    rating: 4.6,
    total_copies: 20,
    available_copies: 10,
    description:
      "A dazzling novel about all the choices that go into a life well lived, The Midnight Library tells the story of Nora Seed as she finds herself between life and death.",
    color: "#1c1f40",
    cover: "https://m.media-amazon.com/images/I/81J6APjwxlL.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary: `In The Midnight Library, Matt Haig explores the concept of regret, choices, and the infinite possibilities of life through the journey of Nora Seed. Struggling with depression and feeling like she has wasted her life, Nora attempts suicide, only to find herself in a mystical library that exists between life and death. Each book in this library represents a different life she could have lived had she made different choices. As she steps into these alternate lives—becoming a rock star, a scientist, an Olympic swimmer, and even a glaciologist—she learns profound lessons about what truly brings fulfillment.
    As Nora experiences the consequences of different choices, she realizes that perfection is an illusion and that every life comes with its own set of struggles. Her journey is not just about exploring the "what-ifs" but also about self-acceptance. Through these experiences, she discovers that happiness isn’t found in external achievements but in perspective, gratitude, and the small moments of connection with others. The novel beautifully blends fantasy with deep philosophical questions about life, fate, and the power of embracing the present.
    Ultimately, The Midnight Library is a heartwarming tale that encourages readers to view life from a different lens. Instead of dwelling on regrets, Haig urges us to appreciate the beauty of our existing journey. With poetic storytelling and emotional depth, this book is a reminder that life’s meaning is not about living the perfect life but about making peace with the one we have and finding joy in the smallest moments.`,
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help / Productivity",
    rating: 4.9,
    total_copies: 99,
    available_copies: 50,
    description:
      "A revolutionary guide to making good habits, breaking bad ones, and getting 1% better every day.",
    color: "#fffdf6",
    cover: "https://m.media-amazon.com/images/I/81F90H7hnML.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary: `James Clear’s Atomic Habits is a transformative guide on how small, consistent changes can lead to remarkable improvements in one’s life. The book is based on the idea that success is not about making huge, radical shifts but about improving just 1% every day. By focusing on habit formation and behavioral psychology, Clear presents a systematic approach to building good habits, breaking bad ones, and mastering the tiny actions that compound into significant results over time.The book introduces the "Four Laws of Behavior Change"—Cue, Craving, Response, and Reward—explaining how habits are formed and how we can redesign them to serve our goals.
    Clear emphasizes the power of identity-based habits, arguing that true change occurs when we shift our self-image, not just our actions.
     For example, instead of saying, “I want to run more,” one should say, “I am a runner.” By making habits a core part of our identity, they become sustainable in the long run.Through real-life stories, scientific insights, and practical techniques, Atomic Habits teaches readers how to create an environment that supports success, overcome motivation obstacles, and stay on track. The book is not just about productivity; it’s about reshaping one’s mindset to create lasting personal transformation. Whether applied to work, health, or relationships, Clear’s strategies make it easier to build a fulfilling and disciplined life, proving that small changes lead to extraordinary results over time.`,
  },
  {
    id: 3,
    title: "You Don't Know JS: Scope & Closures",
    author: "Kyle Simpson",
    genre: "Computer Science / JavaScript",
    rating: 4.7,
    total_copies: 9,
    available_copies: 5,
    description:
      "An essential guide to understanding the core mechanisms of JavaScript, focusing on scope and closures.",
    color: "#f8e036",
    cover:
      "https://m.media-amazon.com/images/I/7186YfjgHHL._AC_UF1000,1000_QL80_.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary: `Kyle Simpson’s You Don’t Know JS: Scope & Closures is a deep dive into the inner workings of JavaScript, focusing on one of the most crucial yet often misunderstood concepts—scope and closures. The book challenges developers to move beyond surface-level knowledge and truly grasp how JavaScript executes code, particularly in how variables are stored, accessed, and manipulated.
       Simpson breaks down lexical scope, explaining how JavaScript determines variable accessibility at different points in execution. He provides real-world examples, interactive exercises, and step-by-step explanations of hoisting, function scopes, and the infamous "this" keyword. The book emphasizes that understanding these fundamental concepts is essential for writing efficient, bug-free JavaScript code.
      One of the standout sections of the book is its exploration of closures—an advanced yet highly practical feature in JavaScript. Closures allow functions to retain access to their outer variables even after execution, making them powerful tools for managing state, handling asynchronous operations, and creating modular code. You Don't Know JS is not just for beginners but for developers looking to master JavaScript at a deeper level. With its engaging writing style and hands-on approach, it’s a must-read for anyone serious about JavaScript development.`,
  },
  {
    id: 4,
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Philosophy / Adventure",
    rating: 4.5,
    total_copies: 78,
    available_copies: 50,
    description:
      "A magical tale of Santiago, an Andalusian shepherd boy, who embarks on a journey to find a worldly treasure.",
    color: "#ed6322",
    cover:
      "https://m.media-amazon.com/images/I/61HAE8zahLL._AC_UF1000,1000_QL80_.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary: `The Alchemist by Paulo Coelho is a timeless philosophical novel that follows the journey of Santiago, a young Andalusian shepherd who dreams of finding a hidden treasure near the Egyptian pyramids. Encouraged by a mysterious king named Melchizedek, Santiago sells his flock and embarks on a journey of self-discovery, love, and personal legend. Along the way, he encounters a series of mentors, including a crystal merchant, an Englishman studying alchemy, and ultimately, the Alchemist himself.
     Santiago’s adventure is filled with trials and obstacles that test his faith and resilience. He learns that the universe conspires to help those who pursue their true destiny, but the path is not always straightforward. From the bustling markets of Tangier to the vast expanse of the desert, Coelho’s vivid storytelling immerses readers in a world of wonder and wisdom. Through Santiago’s encounters, we learn about the importance of following our dreams, listening to our hearts, and embracing the lessons that challenges bring.
     At its core, The Alchemist is a meditation on the pursuit of happiness and the idea that our treasure—whether material or spiritual—is often much closer than we realize. Coelho’s poetic writing and profound insights make this novel an inspiring read for anyone seeking meaning and purpose in life.`,
  },
  {
    id: 5,
    title: "Deep Work",
    author: "Cal Newport",
    genre: "Self-Help / Productivity",
    rating: 4.7,
    total_copies: 23,
    available_copies: 23,
    description:
      "Rules for focused success in a distracted world, teaching how to cultivate deep focus to achieve peak productivity.",
    color: "#ffffff",
    cover: "https://m.media-amazon.com/images/I/81JJ7fyyKyS.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary: `Cal Newport’s Deep Work argues that in a world filled with distractions, the ability to focus deeply on cognitively demanding tasks is a superpower. Newport defines deep work as the state of peak concentration that leads to high productivity and exceptional results. He contrasts this with shallow work—emailing, social media, and multitasking—that fragments our attention and hinders meaningful progress.
    The book is divided into two parts: the first explains why deep work is valuable, and the second provides practical strategies for cultivating it. Newport draws from historical examples of great thinkers like Carl Jung and Bill Gates, who created distraction-free environments to generate groundbreaking ideas. He introduces four approaches to deep work—monastic, bimodal, rhythmic, and journalistic—each suited to different lifestyles.
    Through actionable techniques such as time blocking, eliminating digital noise, and training the brain to embrace boredom, Deep Work empowers readers to reclaim their attention and maximize their output. Newport’s message is clear: in an economy driven by knowledge and creativity, those who master deep work will have a competitive advantage. This book is essential for anyone looking to excel in their career and personal endeavors.`,
  },
  {
    id: 6,
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Computer Science / Programming",
    rating: 4.8,
    total_copies: 56,
    available_copies: 56,
    description:
      "A handbook of agile software craftsmanship, offering best practices and principles for writing clean and maintainable code.",
    color: "#080c0d",
    cover:
      "https://m.media-amazon.com/images/I/71T7aD3EOTL._UF1000,1000_QL80_.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary: `"Clean Code" is an essential guide for software engineers, providing a deep dive into the art of writing maintainable, efficient, and elegant code. Robert C. Martin, also known as "Uncle Bob," emphasizes the importance of writing code that is not only functional but also readable, structured, and scalable. He presents principles and best practices that every programmer should follow to develop clean, high-quality software. The book introduces readers to key concepts like meaningful naming conventions, proper function structuring, code simplicity, and the avoidance of unnecessary complexity. Through real-world examples, Martin demonstrates the transformation of messy, unstructured code into well-organized, efficient programs.
    Beyond just syntax and technical implementation, Clean Code explores the philosophy of software craftsmanship. The author argues that writing clean code is an ethical responsibility, as poorly structured code leads to technical debt, increased maintenance costs, and a frustrating development experience. He introduces principles such as the Single Responsibility Principle (SRP), the Open-Closed Principle (OCP), and the DRY (Don't Repeat Yourself) methodology. Additionally, the book covers the importance of writing effective comments, reducing dependencies, and developing modular code that can be easily refactored without breaking functionality. These practices not only improve software performance but also foster collaboration among teams, making it easier for developers to work on projects together.
    One of the most valuable aspects of Clean Code is its practical application. Martin provides numerous exercises, refactoring examples, and real-world case studies that challenge developers to critically analyze and improve their coding habits. The book also emphasizes the importance of unit testing and continuous integration in maintaining clean, bug-free code. By the end, programmers come away with a renewed perspective on software development, understanding that clean code is not just a technical requirement but an essential discipline that leads to long-term success in software engineering. This book is a must-read for developers looking to elevate their skills and write code that stands the test of time.`,
  },
  {
    id: 7,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    genre: "Computer Science / Programming",
    rating: 4.8,
    total_copies: 25,
    available_copies: 3,
    description:
      "A timeless guide for developers to hone their skills and improve their programming practices.",
    color: "#100f15",
    cover:
      "https://m.media-amazon.com/images/I/71VStSjZmpL._AC_UF1000,1000_QL80_.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary: `Originally published in 1999 and updated in its 20th Anniversary Edition, The Pragmatic Programmer is a must-read for software engineers seeking to refine their skills and adopt a more practical and professional approach to coding. Andrew Hunt and David Thomas take readers on a journey through various programming principles, best practices, and insights into becoming a better developer. The book covers a wide range of topics, including software design, debugging, automation, and adaptability. Unlike traditional technical guides, The Pragmatic Programmer focuses on the mindset and habits that differentiate an ordinary developer from an exceptional one.
      One of the book’s key themes is the importance of writing adaptable and flexible code. The authors introduce the concept of "Tracer Bullets," which suggests developing software incrementally rather than attempting to perfect everything in one go. They emphasize writing small, testable components that evolve based on user feedback, reducing the likelihood of large-scale failures. Another notable principle is "Don't Live with Broken Windows," which advises developers to fix small problems in their codebase immediately to prevent overall software decay. The book also covers automation, encouraging programmers to streamline repetitive tasks and leverage scripts to increase efficiency and reliability.
      Beyond coding techniques, The Pragmatic Programmer also delves into personal and professional development. The authors stress the importance of continuous learning, encouraging developers to explore new programming languages, improve problem-solving skills, and engage with the broader developer community. They highlight the value of effective communication within teams, documenting code properly, and writing meaningful commit messages. The book’s timeless advice is applicable to both beginners and seasoned developers, making it a staple in every programmer's library. It serves as a guide not only for writing great code but also for fostering a disciplined, adaptable, and innovative approach to software development.
`,
  },
  {
    id: 8,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    genre: "Finance / Self-Help",
    rating: 4.8,
    total_copies: 10,
    available_copies: 5,
    description:
      "Morgan Housel explores the unique behaviors and mindsets that shape financial success and decision-making.",
    color: "#ffffff",
    cover:
      "https://m.media-amazon.com/images/I/81Dky+tD+pL._AC_UF1000,1000_QL80_.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary: `Morgan Housel’s The Psychology of Money is a compelling exploration of how people think about and interact with money. Unlike traditional finance books that focus on investment strategies, technical analysis, or economic theories, this book delves into the behavioral aspects of financial decision-making. Housel argues that financial success is not solely determined by intelligence or technical knowledge but is deeply influenced by emotions, experiences, and personal biases. Through engaging storytelling and real-life examples, he explains why people make irrational financial decisions and how understanding human psychology can lead to better financial outcomes.
      One of the book’s key insights is that wealth accumulation is more about behavior than income levels or investment expertise. Housel introduces concepts like "getting wealthy vs. staying wealthy," explaining that while many people focus on making money, few master the art of preserving and growing it. He highlights the power of patience, long-term thinking, and the ability to resist short-term temptations. The book also discusses how luck and risk play a significant role in financial outcomes, using examples from history to illustrate how unpredictable events can impact wealth creation. He emphasizes that no single financial strategy works for everyone because personal circumstances, values, and risk tolerances vary greatly.
      Another major theme in The Psychology of Money is the idea that true wealth is not just about numbers but about freedom and peace of mind. Housel explains that many people chase financial success without understanding what they truly want from money. He encourages readers to focus on financial independence rather than status-driven consumption. The book is filled with practical advice, such as saving more than you think you need, avoiding unnecessary financial complexity, and adopting a simple, sustainable investment strategy. By shifting the focus from technical financial knowledge to personal behavior, Housel provides readers with a refreshing and accessible perspective on managing money wisely. This book is ideal for anyone looking to develop a healthier relationship with money and make smarter financial choices.
`,
  },
];
