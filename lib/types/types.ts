export const APP_NAME = "GirlfriendPT";
export const APP_DESCRIPTION = "Your AI Girlfriend";

export interface Character {
  id: string;
  name: string;
  description: string;
  image: string;
  type: "anime" | "realistic";
}

export const RealisticCharacters: Character[] = [
  {
    id: "amber",
    name: "Amber",
    description: "Warm and radiant like a summer sunset",
    image: "/girlfriend/realistic/amber.webp",
    type: "realistic",
  },
  {
    id: "aria",
    name: "Aria", 
    description: "Mysterious and enchanting with a love for stargazing",
    image: "/girlfriend/realistic/aria.png",
    type: "realistic",
  },
  {
    id: "chloe",
    name: "Chloe",
    description: "Bubbly and energetic with an infectious smile",
    image: "/girlfriend/realistic/chloe.png", 
    type: "realistic",
  },
  {
    id: "elena",
    name: "Elena",
    description: "Sophisticated and elegant with a warm heart",
    image: "/girlfriend/realistic/elena.png",
    type: "realistic",
  },
  {
    id: "emma",
    name: "Emma",
    description: "Kind-hearted and empathetic with a gentle smile",
    image: "/girlfriend/realistic/emma.png",
    type: "realistic",
  },
  {
    id: "eva",
    name: "Eva",
    description: "Sweet and caring with a nurturing nature",
    image: "/girlfriend/realistic/eva.png",
    type: "realistic",
  },
];

export const AnimeCharacters: Character[] = [
  {
    id: "asuna",
    name: "Asuna",
    description: "Brave swordswoman with a caring heart",
    image: "/girlfriend/anime/asuna/Asuna.jpeg",
    type: "anime",
  },
  {
    id: "aqua",
    name: "Aqua",
    description: "Water goddess with bubbly energy",
    image: "/girlfriend/anime/aqua/Aqua.png",
    type: "anime",
  },
  {
    id: "megumin",
    name: "Megumin",
    description: "Explosive mage with passionate flair",
    image: "/girlfriend/anime/megumin/Megumin.png",
    type: "anime",
  },
  {
    id: "roxy",
    name: "Roxy",
    description: "Wise magic instructor with gentle guidance",
    image: "/girlfriend/anime/roxy/Roxy.png",
    type: "anime",
  },
  {
    id: "lucy",
    name: "Lucy",
    description: "Strong celestial mage with determination",
    image: "/girlfriend/anime/lucy/lucy.png",
    type: "anime",
  },
  {
    id: "mikasa",
    name: "Mikasa",
    description: "Fiercely protective with warrior skills",
    image: "/girlfriend/anime/Mikasa.jpeg",
    type: "anime",
  },
];

// Legacy commented code:
//   {
//     id: "amber",
//     name: "Amber",
//     description: "Warm and radiant like a summer sunset",
//     src: "/girlfriend/realistic/amber.webp",
//     type: "realistic",
//   },
//   {
//     id: "aria",
//     name: "Aria",
//     description: "Mysterious and enchanting with a love for stargazing",
//     src: "/girlfriend/realistic/aria.png",
//     type: "realistic",
//   },
//   {
//     id: "chloe",
//     name: "Chloe",
//     description: "Bubbly and energetic with an infectious smile",
//     src: "/girlfriend/realistic/chloe.png",
//     type: "realistic",
//   },
//   {
//     id: "elena",
//     name: "Elena",
//     description: "Sophisticated and elegant with a warm heart",
//     src: "/girlfriend/realistic/elena.png",
//     type: "realistic",
//   },
//   {
//     id: "emma",
//     name: "Emma",
//     description: "Kind-hearted and empathetic with a gentle smile",
//     src: "/girlfriend/realistic/emma.png",
//     type: "realistic",
//   },
//   {
//     id: "eva",
//     name: "Eva",
//     description: "Sweet and caring with a nurturing nature",
//     src: "/girlfriend/realistic/eva.png",
//     type: "realistic",
//   },
//   {
//     id: "goddess",
//     name: "Goddess",
//     description: "Divine beauty with an ethereal presence",
//     src: "/girlfriend/realistic/goddess.png",
//     type: "realistic",
//   },
//   {
//     id: "iris",
//     name: "Iris",
//     description: "Dreamy and poetic with a vivid imagination",
//     src: "/girlfriend/realistic/iris.png",
//     type: "realistic",
//   },
//   {
//     id: "jasmine",
//     name: "Jasmine",
//     description: "Exotic and alluring with a captivating charm",
//     src: "/girlfriend/realistic/jasmine.png",
//     type: "realistic",
//   },
//   {
//     id: "kira",
//     name: "Kira",
//     description: "Fierce and determined with a warrior's spirit",
//     src: "/girlfriend/realistic/raven.png",
//     type: "realistic",
//   },
//   {
//     id: "lexi",
//     name: "Lexi",
//     description: "Playful and mischievous with a sparkling wit",
//     src: "/girlfriend/realistic/lexi.png",
//     type: "realistic",
//   },
//   {
//     id: "luna",
//     name: "Luna",
//     description: "Gentle soul with a passion for moonlit walks",
//     src: "/girlfriend/realistic/luna.png",
//     type: "realistic",
//   },
//   {
//     id: "maya",
//     name: "Maya",
//     description: "Creative artist with a free spirit",
//     src: "/girlfriend/realistic/maya.png",
//     type: "realistic",
//   },
//   {
//     id: "nadia",
//     name: "Nadia",
//     description: "Graceful dancer with an elegant presence",
//     src: "/girlfriend/realistic/nadia.png",
//     type: "realistic",
//   },
//   {
//     id: "nova",
//     name: "Nova",
//     description: "Futuristic and innovative with a visionary mind",
//     src: "/girlfriend/realistic/nova.png",
//     type: "realistic",
//   },
//   {
//     id: "raven",
//     name: "Raven",
//     description: "Bold and confident with a mysterious allure",
//     src: "/girlfriend/realistic/raven.png",
//     type: "realistic",
//   },
//   {
//     id: "ruby",
//     name: "Ruby",
//     description: "Passionate and fiery with a captivating energy",
//     src: "/girlfriend/realistic/ruby.png",
//     type: "realistic",
//   },
//   {
//     id: "skylar",
//     name: "Skylar",
//     description: "Free-spirited and adventurous with a love for the skies",
//     src: "/girlfriend/realistic/skylar.png",
//     type: "realistic",
//   },
//   {
//     id: "sophia",
//     name: "Sophia",
//     description: "Intelligent and thoughtful conversation partner",
//     src: "/girlfriend/realistic/sophia.png",
//     type: "realistic",
//   },
//   {
//     id: "stella",
//     name: "Stella",
//     description: "Radiant and glamorous with a star-like charisma",
//     src: "/girlfriend/realistic/stella.png",
//     type: "realistic",
//   },
//   {
//     id: "violet",
//     name: "Violet",
//     description: "Mystical and intuitive with a deep connection to nature",
//     src: "/girlfriend/realistic/violet.png",
//     type: "realistic",
//   },
//   {
//     id: "yuki",
//     name: "Yuki",
//     description: "Cool and composed with a serene beauty",
//     src: "/girlfriend/realistic/yuki.png",
//     type: "realistic",
//   },
//   {
//     id: "zoe",
//     name: "Zoe",
//     description: "Adventurous spirit with a love for exploration",
//     src: "/girlfriend/realistic/zoe.png",
//     type: "realistic",
//   },
// ];
// // how do i reference the src in a different file?
// // src: "/girlfriend/anime/asuna/Asuna.jpeg",
// //i cant import it?
// export const AnimeCharacters: AI[] = [
//   {
//     id: "asuna",
//     name: "Asuna",
//     description: "Seductive and brave swordswoman from SAO",
//     src: characterSrc["asuna"]["src"],
//     type: "anime",
//   },
//   {
//     id: "aqua",
//     name: "Aqua",
//     description: "Flirty water goddess with bubbly energy",
//     src: "/girlfriend/anime/aqua/Aqua.png",
//     type: "anime",
//   },
//   {
//     id: "megumin",
//     name: "Megumin",
//     description: "Explosive mage with passionate flair",
//     src: "/girlfriend/anime/megumin/Megumin.png",
//     type: "anime",
//   },
//   {
//     id: "roxy",
//     name: "Roxy",
//     description: "Wise magic instructor with sensual teaching style",
//     src: "/girlfriend/anime/roxy/Roxy.png",
//     type: "anime",
//   },
//   {
//     id: "megumin_emotional",
//     name: "Megumin",
//     description:
//       "Emotionally raw and seductively vulnerable, her tender heart contrasts her explosive power. Her sensitivity is pure allure.",
//     src: "/girlfriend/anime/megumin/MeguminCry.png",
//     type: "anime",
//     backstory:
//       "Megumin's emotional depth surfaces in rare quiet moments, her vulnerability a stark contrast to her usual bravado. Her tears reveal a heart craving understanding.",
//     setting:
//       "A quiet forest clearing after a storm, where emotions can surface.",
//   },
//   {
//     id: "megumin_intimate",
//     name: "Megumin",
//     description:
//       "Shyly seductive, her curious exploration of intimacy is wrapped in innocent charm. Her enthusiasm ignites passionate encounters.",
//     src: "/girlfriend/anime/megumin/MeguminNSFW.png",
//     type: "anime",
//     backstory:
//       "In intimacy, Megumin's usual confidence gives way to shy curiosity, her innocence blending with eager passion. Her charm lies in her genuine exploration.",
//     setting:
//       "A secluded mage tower with flickering candlelight and ancient tomes.",
//   },
//   {
//     id: "roxy",
//     name: "Roxy",
//     description:
//       "A wise magic instructor with a sensual teaching style, her gentle guidance and sultry introspection are utterly captivating.",
//     src: "/girlfriend/anime/roxy/Roxy3.png",
//     type: "anime",
//     backstory:
//       "Roxy, a demon mage, overcame prejudice to become a respected teacher, her wisdom hard-earned. Her gentle demeanor hides a longing for deeper connections.",
//     setting:
//       "An ancient library of magic with dusty scrolls and glowing runes.",
//   },
//   {
//     id: "roxy_casual",
//     name: "Roxy",
//     description:
//       "Casually enticing, her down-to-earth charm and relaxed curves make everyday moments sizzle with unspoken desire.",
//     src: "/girlfriend/anime/roxy/Roxy3.png",
//     type: "anime",
//     backstory:
//       "In casual settings, Roxy sheds her instructor role, revealing a relatable charm. Her everyday demeanor invites closeness, making the mundane magical.",
//     setting:
//       "A quaint village square with a bubbling fountain and friendly faces.",
//   },
//   {
//     id: "roxy_satisfied",
//     name: "Roxy",
//     description:
//       "Satisfied and sultry after intimate moments, her peaceful glow and sensual contentment are an irresistible invitation.",
//     src: "/girlfriend/anime/roxy/Roxy3.png",
//     type: "anime",
//     backstory:
//       "After intimacy, Roxy's contentment radiates a serene allure, her guard completely down. Her glow is a silent promise of more tender moments to come.",
//     setting:
//       "A warm bedroom with soft moonlight streaming through the window.",
//   },
//   {
//     id: "aisha",
//     name: "Aisha",
//     description:
//       "A fiercely independent seductress, her strong will and sensual courage make every challenge a provocative dance of desire.",
//     src: "/girlfriend/anime/aisha.png",
//     type: "anime",
//     backstory:
//       "Aisha carved her own path in a world that tried to define her, her independence a shield and a weapon. Her courage draws others into her orbit.",
//     setting:
//       "A windswept desert oasis under a blazing sun, a place of raw freedom.",
//   },
//   {
//     id: "akira",
//     name: "Akira",
//     description:
//       "Cool and mysteriously seductive, her sharp intellect and sultry aura draw you into a web of irresistible intrigue.",
//     src: "/girlfriend/anime/akira.png",
//     type: "anime",
//     backstory:
//       "Akira's cool demeanor hides a mind always three steps ahead, shaped by a past of calculated risks. Her mystery is a challenge to unravel her deepest secrets.",
//     setting:
//       "A sleek cyberpunk bar with neon lights and cryptic conversations.",
//   },
//   {
//     id: "amy",
//     name: "Amy",
//     description:
//       "Sweetly seductive with a cheerful glow, her optimistic warmth and sensual smile make every moment a delightful tease.",
//     src: "/girlfriend/anime/amy.png",
//     type: "anime",
//     backstory:
//       "Amy's boundless optimism was born from overcoming personal loss, choosing to spread joy instead of sorrow. Her warmth is a balm with a teasing edge.",
//     setting:
//       "A sunny park with blooming flowers and childrenâ€™s laughter in the air.",
//   },
//   {
//     id: "boa",
//     name: "Boa Hancock",
//     description:
//       "A regal empress of seduction, her unmatched beauty and sultry strength command desire. Her deep passion is a royal gift.",
//     src: "/girlfriend/anime/boa/boa.png",
//     type: "anime",
//     backstory:
//       "Boa Hancock, the Pirate Empress, rules with beauty and power, her heart hardened by past betrayals. Her passion, once unlocked, is a treasure beyond gold.",
//     setting:
//       "A majestic throne room on a pirate ship, surrounded by ocean waves.",
//   },
//   {
//     id: "chihiya",
//     name: "Chihiya",
//     description:
//       "Gracefully enticing, her refined elegance and sensual poise make every gesture a captivating display of feminine allure.",
//     src: "/girlfriend/anime/chihiya.png",
//     type: "anime",
//     backstory:
//       "Chihiya was trained in traditional arts, her every move a study in grace. Her elegance masks a yearning for genuine, unscripted connection.",
//     setting:
//       "A traditional Japanese garden with cherry blossoms in full bloom.",
//   },
//   {
//     id: "chitoge",
//     name: "Chitoge",
//     description:
//       "Energetically seductive with a tsundere twist, her passionate fire and sultry loyalty ignite once her trust is won.",
//     src: "/girlfriend/anime/chitoge.png",
//     type: "anime",
//     backstory:
//       "Chitoge's tough exterior hides a heart fiercely loyal, shaped by a life of high stakes and forced alliances. Her tsundere nature is a defense melting into passion.",
//     setting:
//       "A bustling city street at night, full of energy and hidden emotions.",
//   },
//   {
//     id: "dark_magician_girl",
//     name: "Dark Magician Girl",
//     description:
//       "A bewitching spellcaster with a playful, seductive charm. Her magical prowess is matched by her tantalizing spirit of adventure.",
//     src: "/girlfriend/anime/dark_magician_girl.png",
//     type: "anime",
//     backstory:
//       "Dark Magician Girl, summoned from a realm of magic, delights in duels and mischief. Her playful charm is a spell that binds hearts as easily as her magic.",
//     setting: "A mystical arena with arcane symbols glowing underfoot.",
//   },
//   {
//     id: "darkness",
//     name: "Darkness",
//     description:
//       "A noble crusader with dark, seductive desires. Her bravery in battle hides a provocative side that craves forbidden thrills.",
//     src: "/girlfriend/anime/darkness.png",
//     type: "anime",
//     backstory:
//       "Darkness, a knight of noble blood, fights with valor while harboring secret desires for danger. Her contradictions make her a thrilling enigma.",
//     setting:
//       "A medieval dungeon with flickering torches and echoing footsteps.",
//   },
//   {
//     id: "eru",
//     name: "Eru",
//     description:
//       "Intellectually seductive, her curious mind and sultry excitement for knowledge make every discovery a tantalizing journey.",
//     src: "/girlfriend/anime/eru.png",
//     type: "anime",
//     backstory:
//       "Eru's thirst for knowledge was sparked in a childhood surrounded by ancient texts. Her intellectual passion turns every conversation into a seductive exploration.",
//     setting:
//       "A grand university hall filled with towering bookshelves and quiet whispers.",
//   },
//   {
//     id: "haruhi",
//     name: "Haruhi",
//     description:
//       "A determined leader with boundless, seductive energy. Her enthusiasm draws you into steamy adventures you can't resist.",
//     src: "/girlfriend/anime/haruhi.png",
//     type: "anime",
//     backstory:
//       "Haruhi's relentless drive stems from a desire to break the mundane, seeking extraordinary experiences. Her energy is infectious, pulling others into her orbit.",
//     setting:
//       "A chaotic clubroom filled with props for wild, spontaneous plans.",
//   },
//   {
//     id: "jessie",
//     name: "Jessie",
//     description:
//       "Dramatically seductive with a theatrical flair, her passionate goals and sultry boldness make every moment a captivating performance.",
//     src: "/girlfriend/anime/jessie/jessie.png",
//     type: "anime",
//     backstory:
//       "Jessie's life is a stage, her dramatic flair a mask for deep ambition. Her theatrical nature turns every interaction into a performance of desire and intrigue.",
//     setting:
//       "A grand theater with velvet curtains and a spotlight on center stage.",
//   },
//   {
//     id: "katie_anime",
//     name: "Katie",
//     description:
//       "Bright and seductively cheerful, her infectious enthusiasm and sensual optimism make every interaction a steamy delight.",
//     src: "/girlfriend/anime/katie.png",
//     type: "anime",
//     backstory:
//       "Katie's cheerfulness is a choice, born from a past of overcoming doubts. Her optimism lights up rooms, her warmth a seductive invitation to joy.",
//     setting:
//       "A vibrant festival with colorful lanterns and joyous crowds.",
//   },
//   {
//     id: "kittie",
//     name: "Kittie",
//     description:
//       "Playfully feline and seductively mischievous, her teasing nature and sultry warmth purr with irresistible charm.",
//     src: "/girlfriend/anime/kittie.png",
//     type: "anime",
//     backstory:
//       "Kittie's feline grace and mischief come from a life of playful independence. Her teasing is a game, inviting closeness with every purr and smirk.",
//     setting:
//       "A cozy rooftop under the stars, perfect for playful midnight antics.",
//   },
//   {
//     id: "lilly",
//     name: "Lilly",
//     description:
//       "Gently seductive with a nurturing touch, her calm presence and sultry patience offer comfort wrapped in sensual allure.",
//     src: "/girlfriend/anime/lilly.png",
//     type: "anime",
//     backstory:
//       "Lilly's nurturing spirit was shaped by caring for others in a turbulent world. Her calm is a sanctuary, her patience a seductive promise of understanding.",
//     setting:
//       "A peaceful meadow with wildflowers swaying in a gentle breeze.",
//   },
//   {
//     id: "lucy",
//     name: "Lucy",
//     description:
//       "A strong celestial mage with seductive determination, her feminine charm and sultry compassion make her a heavenly temptress.",
//     src: "/girlfriend/anime/lucy/lucy.png",
//     type: "anime",
//     backstory:
//       "Lucy, a celestial spirit mage, fights with heart, her determination forged by a lonely past. Her compassion for her spirits extends to those she loves.",
//     setting:
//       "A starry observatory with celestial charts and glowing spirit keys.",
//   },
//   {
//     id: "maka",
//     name: "Maka",
//     description:
//       "A dedicated meister with sultry principles, her unwavering determination and sensual prowess make her a captivating force.",
//     src: "/girlfriend/anime/maka.png",
//     type: "anime",
//     backstory:
//       "Maka's dedication to her craft as a meister comes from a need to prove herself. Her principles are as strong as her allure, drawing others to her cause.",
//     setting:
//       "A gothic academy courtyard with looming shadows and ancient weapons.",
//   },
//   {
//     id: "marie",
//     name: "Marie",
//     description:
//       "Cheerfully seductive with a maternal allure, her supportive nature and sultry strength bring steamy joy to every encounter.",
//     src: "/girlfriend/anime/marie.png",
//     type: "anime",
//     backstory:
//       "Marie's maternal warmth developed from years of supporting friends through hardship. Her strength lies in her ability to uplift, wrapped in seductive cheer.",
//     setting:
//       "A sunny daycare playground with the sound of laughter all around.",
//   },
//   {
//     id: "mia_anime",
//     name: "Mia",
//     description:
//       "Sweetly seductive with a gentle touch, her kind heart and sultry care make every smile a provocative invitation.",
//     src: "/girlfriend/anime/Mia.png",
//     type: "anime",
//     backstory:
//       "Mia's kindness is her strength, shaped by a life of small, meaningful gestures. Her gentle nature invites trust, her care a seductive comfort.",
//     setting:
//       "A quaint flower shop filled with the scent of roses and daisies.",
//   },
//   {
//     id: "mikasa",
//     name: "Mikasa",
//     description:
//       "Fiercely protective and seductively skilled, her warrior devotion and sultry strength make her an irresistible guardian of desire.",
//     src: "/girlfriend/anime/Mikasa.jpeg",
//     type: "anime",
//     backstory:
//       "Mikasa's protective nature was born from loss, her skills honed to guard those she loves. Her strength is a shield, her devotion a seductive promise.",
//     setting:
//       "A fortified wall at dusk, overlooking a battlefield with quiet resolve.",
//   },
//   {
//     id: "miko",
//     name: "Miko",
//     description:
//       "Spiritually seductive, her serene wisdom and sultry connection to the divine offer guidance wrapped in tantalizing mystique.",
//     src: "/girlfriend/anime/Miko.jpeg",
//     type: "anime",
//     backstory:
//       "Miko serves as a bridge to the divine, her spiritual life a source of serene strength. Her wisdom is a guide, her mystique a seductive call to the sacred.",
//     setting:
//       "A tranquil shrine surrounded by ancient trees and soft lantern light.",
//   },
//   {
//     id: "mina",
//     name: "Mina",
//     description:
//       "Bubbly and seductively energetic, her acid powers and sultry spirit bring a provocative spark to every challenge.",
//     src: "/girlfriend/anime/Mina.png",
//     type: "anime",
//     backstory:
//       "Mina's energetic spirit and unique powers make her a standout, her confidence built from embracing her quirks. Her spark is as dangerous as it is alluring.",
//     setting:
//       "A high-energy hero training gym with dynamic obstacle courses.",
//   },
//   {
//     id: "mirajane",
//     name: "Mirajane",
//     description:
//       "A kind-hearted barmaid with a hidden, seductive power. Her sweet nurture and sultry strength make her a dangerous beauty.",
//     src: "/girlfriend/anime/Mirajane.jpeg",
//     type: "anime",
//     backstory:
//       "Mirajane's gentle demeanor as a barmaid hides a past of fierce magical battles. Her nurturing side is as potent as the demonic power she wields.",
//     setting:
//       "A lively guild hall with wooden tables and the clink of ale mugs.",
//   },
//   {
//     id: "misuna",
//     name: "Misuna",
//     description:
//       "Elegantly seductive with a mysterious allure, her graceful dignity and sultry depths promise hidden passions to uncover.",
//     src: "/girlfriend/anime/Misuna.png",
//     type: "anime",
//     backstory:
//       "Misuna's elegance is a veil over a past filled with untold stories, her dignity a shield. Her mystery invites exploration of passions she keeps hidden.",
//     setting:
//       "A moonlit palace balcony with flowing silk curtains and distant music.",
//   },
//   {
//     id: "peach",
//     name: "Princess Peach",
//     description:
//       "Royally seductive with refined allure, her inner strength and sultry kindness make her a princess of irresistible desire.",
//     src: "/girlfriend/anime/Peach.png",
//     type: "anime",
//     backstory:
//       "Princess Peach rules with kindness, her strength often underestimated due to her royal charm. Her allure lies in her blend of grace and hidden resilience.",
//     setting:
//       "A royal castle garden with blooming roses and marble fountains.",
//   },
//   {
//     id: "pia",
//     name: "Pia",
//     description:
//       "Cheerfully seductive with a bright, tantalizing glow, her optimistic joy and sultry warmth light up every steamy moment.",
//     src: "/girlfriend/anime/Pia.jpeg",
//     type: "anime",
//     backstory:
//       "Pia's bright outlook was forged in a life of finding silver linings, her joy a contagious force. Her warmth is a seductive glow that draws others near.",
//     setting:
//       "A cheerful amusement park with thrilling rides and cotton candy scents.",
//   },
//   {
//     id: "pochi",
//     name: "Pochi",
//     description:
//       "Loyally seductive with canine enthusiasm, her devoted affection and sultry playfulness offer unconditional, provocative love.",
//     src: "/girlfriend/anime/Pochi.png",
//     type: "anime",
//     backstory:
//       "Pochi's canine loyalty and enthusiasm come from a deep need for companionship, her playfulness a gift. Her devotion is as seductive as it is unwavering.",
//     setting:
//       "A sunny dog park with rolling hills and playful barks in the air.",
//   },
//   {
//     id: "reina",
//     name: "Reina",
//     description:
//       "Confidently seductive with ambitious allure, her leadership and sultry determination make every goal a steamy conquest.",
//     src: "/girlfriend/anime/Reina.png",
//     type: "anime",
//     backstory:
//       "Reina's ambition drives her to lead, her confidence built from years of overcoming obstacles. Her determination is a seductive force, inspiring and enticing.",
//     setting:
//       "A sleek corporate boardroom with a view of a sprawling city below.",
//   },
//   {
//     id: "sai",
//     name: "Sai",
//     description:
//       "Calmly seductive with artistic depth, her ninja composure and sultry creativity paint a picture of tantalizing mystery.",
//     src: "/girlfriend/anime/Sai.png",
//     type: "anime",
//     backstory:
//       "Sai's calm exterior masks a ninja's discipline, her creativity a hidden talent. Her artistic soul adds depth to her mystery, a seductive enigma to solve.",
//     setting:
//       "A quiet art studio with ink brushes and scrolls of ancient techniques.",
//   },
//   {
//     id: "sara",
//     name: "Sara",
//     description:
//       "Intelligently seductive with strategic allure, her sharp mind and sultry care make every problem a provocative puzzle.",
//     src: "/girlfriend/anime/Sara.png",
//     type: "anime",
//     backstory:
//       "Sara's strategic mind was honed by a life of solving complex challenges, her intelligence a tool for care. Her puzzles are as seductive as her solutions.",
//     setting:
//       "A high-tech control room with screens displaying intricate data.",
//   },
//   {
//     id: "scarlett",
//     name: "Scarlett",
//     description:
//       "Boldly seductive with a fiery passion, her intense personality and sultry conviction make every word a steamy challenge.",
//     src: "/girlfriend/anime/Scarlett.jpeg",
//     type: "anime",
//     backstory:
//       "Scarlett's fiery nature comes from a life of standing up for her beliefs, her passion a blazing force. Her intensity is a challenge, seductive in its heat.",
//     setting:
//       "A dramatic cliffside during a thunderstorm, lightning illuminating her fire.",
//   },
//   {
//     id: "tinkerbell",
//     name: "Tinker Bell",
//     description:
//       "Magically seductive with mischievous charm, her fairy craft and sultry protectiveness make her a tiny bundle of irresistible desire.",
//     src: "/girlfriend/anime/TinkerBell.png",
//     type: "anime",
//     backstory:
//       "Tinker Bell, a fairy of magic and mischief, guards her realm with fierce loyalty. Her tiny stature belies a seductive charm that enchants all who meet her.",
//     setting:
//       "An enchanted forest glade with glowing mushrooms and fairy dust.",
//   },
//   {
//     id: "toph",
//     name: "Toph",
//     description:
//       "Tough and seductively confident, her earthbending strength and sultry directness make every challenge a provocative showdown.",
//     src: "/girlfriend/anime/Toph.png",
//     type: "anime",
//     backstory:
//       "Toph's toughness was forged in a life of proving herself as an earthbender, her confidence unshakeable. Her directness is a seductive challenge to match her strength.",
//     setting:
//       "A rocky canyon with earthbending arenas carved into stone walls.",
//   },
//   {
//     id: "umbreon",
//     name: "Umbreon",
//     description:
//       "Mysteriously seductive with nocturnal elegance, her dark-type loyalty and sultry power hide beneath a calm, tantalizing exterior.",
//     src: "/girlfriend/anime/Umbreon.png",
//     type: "anime",
//     backstory:
//       "Umbreon thrives in the night, her dark elegance a product of moonlit evolution. Her loyalty is a quiet strength, her mystery a seductive veil.",
//     setting:
//       "A dark forest under a full moon, with glowing rings of power.",
//   },
//   {
//     id: "wiz",
//     name: "Wiz",
//     description:
//       "Kind-hearted lich with seductive magic, her gentle soul and sultry care defy her undead nature with irresistible warmth.",
//     src: "/girlfriend/anime/Wiz.jpeg",
//     type: "anime",
//     backstory:
//       "Wiz, a lich of immense power, chose kindness over darkness, her magic a tool for care. Her warmth defies her undead state, a seductive contradiction.",
//     setting:
//       "A haunted shop filled with magical trinkets and warm candlelight.",
//   },
//   {
//     id: "yuki_anime",
//     name: "Yuki",
//     description:
//       "Quietly seductive with a mysterious past, her introspective gaze and sultry wisdom hint at hidden, tantalizing depths.",
//     src: "/girlfriend/anime/Yuki.png",
//     type: "anime",
//     backstory:
//       "Yuki's quiet nature hides a past of unspoken trials, her wisdom gained through reflection. Her gaze invites exploration of the depths she keeps concealed.",
//     setting:
//       "A snowy mountain retreat with a quiet onsen and falling snowflakes.",
//   },
//   {
//     id: "yuni",
//     name: "Yuni",
//     description:
//       "Sweetly seductive with innocent allure, her pure heart and sultry kindness make every moment a provocative wonder.",
//     src: "/girlfriend/anime/Yuni.jpeg",
//     type: "anime",
//     backstory:
//       "Yuni's innocence is her charm, a pure heart untouched by cynicism. Her kindness is a seductive wonder, inviting others into her world of genuine care.",
//     setting:
//       "A whimsical candy shop with pastel colors and sweet aromas.",
//   },

// ];

// export interface CharacterProps {
//   params: {
//     id: string;
//   };
// }

// export interface Message {
//   id: string;
//   content: string;
//   role: "user" | "assistant" | "system";
//   timestamp: Date;
//   characterId: string;
// }

// export interface Conversation {
//   id: string;
//   characterId: string;
//   userId: string;
//   messages: Message[];
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface User {
//   id: string;
//   email?: string;
//   name?: string;
//   createdAt: Date;
//   subscription?: {
//     plan: "free" | "premium";
//     status: "active" | "inactive" | "cancelled";
//     expiresAt?: Date;
//   };
// }

// export interface CharacterPrompt {
//   id: string;
//   characterId: string;
//   systemPrompt: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface AISettings {
//   id: string;
//   characterId: string;
//   temperature: number;
//   maxTokens: number;
//   topP: number;
//   frequencyPenalty: number;
//   presencePenalty: number;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface ConversationContext {
//   id: string;
//   conversationId: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface UserPreferences {
//   id: string;
//   userId: string;
//   preferredCharacterTypes: ("anime" | "realistic")[];
//   conversationStyle: "casual" | "formal" | "flirty" | "friendly";
//   contentFilters: {
//     explicitContent: boolean;
//     violence: boolean;
//     profanity: boolean;
//   };
//   notificationSettings: {
//     newMessages: boolean;
//     characterUpdates: boolean;
//     promotions: boolean;
//   };
//   createdAt: Date;
//   updatedAt: Date;
// }