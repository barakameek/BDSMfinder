class StyleFinderApp {
  constructor() {
    // Initial state variables
    this.styleFinderActive = false;
    this.styleFinderStep = 0;
    this.styleFinderRole = null;
    this.styleFinderAnswers = { traits: {} };
    this.styleFinderScores = {};
    this.hasRenderedDashboard = false;

    // Style categories
    this.styles = {
      submissive: [
        'Submissive', 'Brat', 'Slave', 'Switch', 'Pet', 'Little', 'Puppy', 'Kitten', 'Princess', 'Rope Bunny',
        'Masochist', 'Prey', 'Toy', 'Doll', 'Bunny', 'Servant', 'Playmate', 'Babygirl', 'Captive', 'Thrall'
      ],
      dominant: [
        'Dominant', 'Assertive', 'Nurturer', 'Strict', 'Master', 'Mistress', 'Daddy', 'Mommy', 'Owner', 'Rigger',
        'Sadist', 'Hunter', 'Trainer', 'Puppeteer', 'Protector', 'Disciplinarian', 'Caretaker', 'Sir', 'Goddess', 'Commander'
      ]
    };

    // Submissive traits (randomized order)
    this.subFinderTraits = [
      { name: 'obedience', desc: 'Do you find peace in following orders?' },
      { name: 'rebellion', desc: 'Do you enjoy teasing or resisting just a little?' },
      { name: 'service', desc: 'Does helping others feel rewarding to you?' },
      { name: 'playfulness', desc: 'Do you love silly games or lighthearted fun?' },
      { name: 'sensuality', desc: 'Does touch or texture excite your senses?' },
      { name: 'exploration', desc: 'Are you eager to try new experiences?' },
      { name: 'devotion', desc: 'Do you feel fulfilled by deep loyalty?' },
      { name: 'innocence', desc: 'Do you enjoy feeling carefree or childlike?' },
      { name: 'mischief', desc: 'Do you like stirring up a bit of trouble?' },
      { name: 'affection', desc: 'Do you crave closeness and cuddles?' },
      { name: 'painTolerance', desc: 'Do you enjoy a sting or ache for fun?' },
      { name: 'submissionDepth', desc: 'Do you love giving up control completely?' },
      { name: 'dependence', desc: 'Do you feel safe relying on someone else?' },
      { name: 'vulnerability', desc: 'Does being open and exposed feel right?' },
      { name: 'adaptability', desc: 'Do you switch easily between roles?' }
    ].sort(() => 0.5 - Math.random());

    // Submissive trait footnotes
    this.subTraitFootnotes = {
      obedience: "1: Rarely follows / 10: Always obeys",
      rebellion: "1: Very compliant / 10: Loves to resist",
      service: "1: Self-focused / 10: Service-driven",
      playfulness: "1: Serious / 10: Super playful",
      sensuality: "1: Not sensory / 10: Highly sensual",
      exploration: "1: Stays safe / 10: Seeks adventure",
      devotion: "1: Independent / 10: Deeply devoted",
      innocence: "1: Mature / 10: Very innocent",
      mischief: "1: Calm / 10: Mischievous",
      affection: "1: Distant / 10: Super affectionate",
      painTolerance: "1: Avoids pain / 10: Loves pain",
      submissionDepth: "1: Light submission / 10: Total surrender",
      dependence: "1: Self-reliant / 10: Loves guidance",
      vulnerability: "1: Guarded / 10: Fully open",
      adaptability: "1: Fixed role / 10: Very versatile"
    };

    // Dominant traits (randomized order)
    this.domFinderTraits = [
      { name: 'authority', desc: 'Do you feel strong when you take charge?' },
      { name: 'confidence', desc: 'Are you sure of your decisions?' },
      { name: 'discipline', desc: 'Do you enjoy setting firm rules?' },
      { name: 'boldness', desc: 'Do you dive into challenges fearlessly?' },
      { name: 'care', desc: 'Do you love supporting and protecting others?' },
      { name: 'empathy', desc: 'Do you tune into others’ feelings easily?' },
      { name: 'control', desc: 'Do you thrive on directing every detail?' },
      { name: 'creativity', desc: 'Do you enjoy crafting unique scenes?' },
      { name: 'precision', desc: 'Are you careful with every step you take?' },
      { name: 'intensity', desc: 'Do you bring fierce energy to what you do?' },
      { name: 'sadism', desc: 'Does giving a little pain excite you?' },
      { name: 'leadership', desc: 'Do you naturally guide others forward?' },
      { name: 'possession', desc: 'Do you feel pride in owning what’s yours?' },
      { name: 'patience', desc: 'Are you calm while teaching or training?' },
      { name: 'dominanceDepth', desc: 'Do you crave total power in a scene?' }
    ].sort(() => 0.5 - Math.random());

    // Dominant trait footnotes
    this.domTraitFootnotes = {
      authority: "1: Gentle / 10: Very commanding",
      confidence: "1: Hesitant / 10: Rock-solid",
      discipline: "1: Relaxed / 10: Strict",
      boldness: "1: Cautious / 10: Fearless",
      care: "1: Detached / 10: Deeply caring",
      empathy: "1: Distant / 10: Highly intuitive",
      control: "1: Hands-off / 10: Total control",
      creativity: "1: Routine / 10: Very creative",
      precision: "1: Casual / 10: Meticulous",
      intensity: "1: Soft / 10: Intense",
      sadism: "1: Avoids pain / 10: Enjoys giving pain",
      leadership: "1: Follower / 10: Natural leader",
      possession: "1: Shares / 10: Very possessive",
      patience: "1: Impatient / 10: Very patient",
      dominanceDepth: "1: Light control / 10: Full dominance"
    };

    // Slider descriptions for each trait (1-10 scale)
    this.sliderDescriptions = {
      obedience: [
        "You dodge orders like a breeze!",
        "Rules? You’re too free for that!",
        "You’ll follow if it’s fun!",
        "A little “yes” slips out sometimes!",
        "You’re cool with gentle guidance!",
        "Following feels kinda nice!",
        "You like pleasing when asked!",
        "Obeying’s your quiet joy!",
        "You love a sweet “please”!",
        "You glow when you say “yes”!"
      ],
      rebellion: [
        "You’re too sweet to say no!",
        "A tiny “nah” sneaks out!",
        "You nudge rules with a smile!",
        "Teasing’s your little game!",
        "Half yes, half no—cute!",
        "You push back with charm!",
        "Defiance is your sparkle!",
        "You love a playful “no”!",
        "Rebel vibes all the way!",
        "You’re a cheeky star!"
      ],
      service: [
        "Helping? You’re too chill!",
        "A quick favor’s enough!",
        "You help if they’re sweet!",
        "You pitch in when it’s easy!",
        "Serving’s okay sometimes!",
        "You like making them smile!",
        "Helping’s your happy place!",
        "You love a kind task!",
        "You’re a service sweetie!",
        "Caring’s your superpower!"
      ],
      playfulness: [
        "Serious is your vibe!",
        "A giggle slips out!",
        "You play if it’s light!",
        "Half serious, half silly!",
        "You’re warming up to fun!",
        "Playtime’s your joy!",
        "You bounce with glee!",
        "Silly’s your middle name!",
        "You’re a playful whirlwind!",
        "Games are your world!"
      ],
      sensuality: [
        "Touch? Not your thing!",
        "A soft pat’s okay!",
        "You like a little feel!",
        "Textures are kinda neat!",
        "You’re into soft vibes!",
        "Silk makes you happy!",
        "You love a sensory tickle!",
        "Touch is your bliss!",
        "You’re all about feels!",
        "Sensory queen!"
      ],
      exploration: [
        "Safe is your spot!",
        "A tiny step out—shy!",
        "You peek at new stuff!",
        "You’ll try if it’s safe!",
        "Half cozy, half curious!",
        "New things excite you!",
        "You chase the unknown!",
        "Adventure’s your jam!",
        "You’re a bold explorer!",
        "Nothing stops you!"
      ],
      devotion: [
        "Free and solo!",
        "A bit of heart shows!",
        "You care if they’re near!",
        "Half free, half true!",
        "You’re warming up!",
        "Devotion’s your glow!",
        "You’re all in soft!",
        "Loyalty’s your core!",
        "You’re a devotion gem!",
        "Total soulmate!"
      ],
      innocence: [
        "Wise beyond your years!",
        "A bit of wonder peeks out!",
        "You’re half grown, half kid!",
        "Silly feels nice sometimes!",
        "You’re dipping into cute!",
        "Innocence is your vibe!",
        "You’re a sweet dreamer!",
        "Giggles are your song!",
        "You’re pure sunshine!",
        "Total kid at heart!"
      ],
      mischief: [
        "Too good for tricks!",
        "A tiny prank slips!",
        "You stir if it’s safe!",
        "Half calm, half cheeky!",
        "You’re a sneaky spark!",
        "Mischief’s your game!",
        "You love a little chaos!",
        "Trouble’s your friend!",
        "You’re a mischief pro!",
        "Chaos queen!"
      ],
      affection: [
        "Hugs? Not really!",
        "A quick cuddle’s fine!",
        "You like a soft touch!",
        "Half aloof, half warm!",
        "You’re into snuggles!",
        "Cuddles are your joy!",
        "You love closeness!",
        "Affection’s your glow!",
        "You’re a hug star!",
        "Total love bug!"
      ],
      painTolerance: [
        "You tire out quick!",
        "A little push is enough!",
        "You last if it’s fun!",
        "You’re steady for a bit!",
        "Halfway there—nice!",
        "You keep going strong!",
        "Endurance is your thing!",
        "You’re tough and ready!",
        "You never stop—wow!",
        "Marathon champ!"
      ],
      submissionDepth: [
        "You’re free as a bird!",
        "A little give peeks out!",
        "You bend if it’s chill!",
        "Half you, half them!",
        "You’re easing in!",
        "Surrender’s kinda fun!",
        "You dive in soft!",
        "Control’s theirs—yay!",
        "You’re all theirs!",
        "Total trust star!"
      ],
      dependence: [
        "Solo’s your jam!",
        "A lean slips in!",
        "You lean if they’re nice!",
        "Half free, half clingy!",
        "You’re okay with help!",
        "Relying feels good!",
        "You love their lead!",
        "They’re your rock!",
        "You’re a lean-in pro!",
        "Total trust buddy!"
      ],
      vulnerability: [
        "Walls up high!",
        "A peek slips out!",
        "You share if safe!",
        "Half guarded, half open!",
        "You’re softening up!",
        "Open’s your vibe!",
        "You bare it soft!",
        "Heart’s wide open!",
        "You’re a trust gem!",
        "Total soul sharer!"
      ],
      adaptability: [
        "One way—you’re set!",
        "A tiny switch is fine!",
        "You bend a little!",
        "Half fixed, half fluid!",
        "You’re okay with change!",
        "Switching’s easy!",
        "You roll with it!",
        "Flex is your strength!",
        "You flip like a pro!",
        "Total chameleon!"
      ],
      authority: [
        "Soft and shy!",
        "A little lead peeks!",
        "You guide if asked!",
        "Half gentle, half firm!",
        "You’re stepping up!",
        "Authority’s your vibe!",
        "You lead with ease!",
        "You’re a strong guide!",
        "Boss mode on!",
        "Total commander!"
      ],
      confidence: [
        "Quiet and unsure!",
        "A bit of bold shows!",
        "You’re sure if it’s easy!",
        "Half shy, half steady!",
        "You’re growing bold!",
        "Confidence shines!",
        "You trust your gut!",
        "You’re rock solid!",
        "Bold and bright!",
        "Total powerhouse!"
      ],
      discipline: [
        "Free and wild!",
        "A rule slips in!",
        "You set soft lines!",
        "Half loose, half tight!",
        "You’re liking order!",
        "Discipline’s your jam!",
        "You keep it firm!",
        "Rules are your strength!",
        "You’re super strict!",
        "Total control!"
      ],
      boldness: [
        "Careful and calm!",
        "A risk peeks out!",
        "You leap if safe!",
        "Half shy, half daring!",
        "You’re getting brave!",
        "Boldness is you!",
        "You dive right in!",
        "Fearless vibes!",
        "You’re a bold star!",
        "Total daredevil!"
      ],
      care: [
        "Cool and aloof!",
        "A care slips out!",
        "You help if asked!",
        "Half chill, half warm!",
        "You’re a soft guide!",
        "Nurturing’s your glow!",
        "You protect with love!",
        "Care is your core!",
        "You’re a warm star!",
        "Total nurturer!"
      ],
      empathy: [
        "Distant and chill!",
        "A feel peeks out!",
        "You get it if clear!",
        "Half aloof, half tuned!",
        "You’re sensing more!",
        "Empathy’s your gift!",
        "You feel it all!",
        "You’re in sync!",
        "You’re a heart reader!",
        "Total intuitive!"
      ],
      control: [
        "Free and open!",
        "A claim slips out!",
        "You hold if sweet!",
        "Half share, half mine!",
        "You’re liking it!",
        "Control’s your vibe!",
        "You claim with pride!",
        "Yours is yours!",
        "You’re a keeper!",
        "Total owner!"
      ],
      creativity: [
        "Simple’s your way!",
        "A spark pops up!",
        "You craft if quick!",
        "Half plain, half wild!",
        "You’re sparking up!",
        "Creativity flows!",
        "You make magic!",
        "Ideas are your joy!",
        "You’re a vision star!",
        "Total creator!"
      ],
      precision: [
        "Loose and free!",
        "A bit neat’s fine!",
        "You care if fast!",
        "Half sloppy, half sharp!",
        "You’re getting exact!",
        "Precision’s your thing!",
        "You nail it all!",
        "Every step’s perfect!",
        "You’re a detail whiz!",
        "Total master!"
      ],
      intensity: [
        "Soft and mellow!",
        "A flare sneaks out!",
        "You heat if safe!",
        "Half calm, half fierce!",
        "You’re turning up!",
        "Intensity’s your spark!",
        "You bring the blaze!",
        "Fierce is your vibe!",
        "You’re a fire star!",
        "Total storm!"
      ],
      sadism: [
        "Soft and sweet!",
        "A tease slips in!",
        "You push a little!",
        "Half gentle, half wild!",
        "You’re testing it!",
        "Pain’s your play!",
        "You love the sting!",
        "Thrill’s your game!",
        "You’re a spicy star!",
        "Total edge master!"
      ],
      leadership: [
        "Soft and shy!",
        "A lead peeks out!",
        "You guide if asked!",
        "Half gentle, half firm!",
        "You’re stepping up!",
        "Leading’s your vibe!",
        "You steer with ease!",
        "You’re a bold guide!",
        "Leader mode on!",
        "Total captain!"
      ],
      possession: [
        "Free and open!",
        "A claim slips out!",
        "You hold if sweet!",
        "Half share, half mine!",
        "You’re liking it!",
        "Possession’s your vibe!",
        "You claim with pride!",
        "Yours is yours!",
        "You’re a keeper!",
        "Total owner!"
      ],
      patience: [
        "Fast and now!",
        "A wait slips in!",
        "You chill if quick!",
        "Half rush, half calm!",
        "You’re cooling down!",
        "Patience is you!",
        "You wait with grace!",
        "Calm’s your strength!",
        "You’re a zen star!",
        "Total peace!"
      ],
      dominanceDepth: [
        "Light and free!",
        "A hold peeks out!",
        "You lead if easy!",
        "Half soft, half firm!",
        "You’re taking charge!",
        "Power’s your glow!",
        "You rule with ease!",
        "Control’s your core!",
        "You’re a power gem!",
        "Total ruler!"
      ]
    };

    // Trait explanations for info popups
    this.traitExplanations = {
      obedience: "This question explores how much you enjoy following instructions or rules given by someone else. Do you feel calm and happy when you’re told what to do, or do you prefer doing your own thing?",
      rebellion: "Here, we’re checking how much you like to playfully resist or tease when given orders. Are you someone who follows easily, or do you enjoy a little back-and-forth?",
      service: "This is about how much joy you get from helping or doing things for others. Do tasks like fetching something or assisting feel rewarding to you?",
      playfulness: "We’re asking how much you love silly, lighthearted fun. Are you serious most of the time, or do games and giggles light you up?",
      sensuality: "This looks at how much physical sensations—like soft touches or textures—excite you. Do you crave sensory experiences, or are they just okay?",
      exploration: "This checks your eagerness to try new things. Are you comfy sticking to what you know, or do you jump at the chance to experiment?",
      devotion: "We’re seeing how deeply loyal you feel toward someone. Do you stick by them no matter what, or do you like your independence?",
      innocence: "This is about enjoying a carefree, childlike vibe. Do you feel mature and serious, or do you love feeling sweet and playful?",
      mischief: "Here, we’re asking if you enjoy stirring things up a bit. Are you calm and good, or do you love a cheeky prank?",
      affection: "This explores how much you crave closeness and cuddles. Are hugs your thing, or do you prefer a bit of space?",
      painTolerance: "We’re checking how you feel about discomfort or a little sting. Does it excite you, or do you shy away from it?",
      submissionDepth: "This digs into how much control you’re happy giving up. Do you like light guidance, or do you enjoy totally letting go?",
      dependence: "This asks if you feel safe relying on someone else. Are you super independent, or do you love leaning on others?",
      vulnerability: "We’re seeing how comfy you are opening up emotionally. Do you keep your guard up, or do you share your heart easily?",
      adaptability: "This checks how easily you switch between roles or moods. Are you set in one way, or do you flow with changes?",
      authority: "This is about how natural it feels to take charge. Do you love leading, or do you prefer a softer approach?",
      confidence: "We’re asking how sure you feel in your choices. Are you bold and steady, or do you hesitate sometimes?",
      discipline: "This explores how much you enjoy setting rules. Do you like structure, or are you more relaxed?",
      boldness: "Here, we’re checking how fearless you are. Do you dive into challenges, or take it slow?",
      care: "This looks at how much you love supporting others. Are you a nurturing type, or more hands-off?",
      empathy: "We’re seeing how well you tune into others’ feelings. Do you feel what they feel, or keep a bit of distance?",
      control: "This asks how much you thrive on directing things. Do you love being in charge, or let things flow?",
      creativity: "This checks how much you enjoy crafting unique ideas. Are you imaginative, or do you stick to the basics?",
      precision: "We’re asking how careful you are with details. Do you plan every step, or go with the vibe?",
      intensity: "This explores how much fierce energy you bring. Are you calm, or do you burn bright?",
      sadism: "Here, we’re seeing if giving a little pain excites you. Is it fun for you, or not your thing?",
      leadership: "This is about guiding others naturally. Do you lead the way, or step back a bit?",
      possession: "We’re checking how much you feel pride in ‘owning’ what’s yours. Are you possessive, or easygoing?",
      patience: "This asks how calm you are when teaching or waiting. Are you chill, or do you push fast?",
      dominanceDepth: "This digs into how much power you crave. Do you like light control, or total command?"
    };

    // Style descriptions with short, long, and tips
    this.styleDescriptions = {
      Submissive: {
        short: "You thrive on guidance and love letting someone else lead the way.",
        long: "A Submissive finds joy in yielding to another’s direction, savoring the peace that comes with trust and structure. This role is about embracing vulnerability and finding strength in surrender.",
        tips: ["Communicate your limits clearly.", "Find a partner who respects your surrender.", "Explore different levels of submission."]
      },
      Brat: {
        short: "You’re cheeky and love pushing buttons for fun!",
        long: "Brats delight in playful resistance, turning every rule into a game of wit and charm. This style is all about the thrill of the chase and the joy of being 'tamed'.",
        tips: ["Keep it light and fun.", "Pair with someone who enjoys the chase.", "Set clear boundaries for your defiance."]
      },
      Slave: {
        short: "You find fulfillment in total devotion and service.",
        long: "Slaves are deeply committed to serving their partner, often embracing a high level of control and structure. This role requires immense trust and clear communication.",
        tips: ["Negotiate limits thoroughly.", "Ensure your partner values your devotion.", "Prioritize self-care."]
      },
      Switch: {
        short: "You flow effortlessly between leading and following.",
        long: "Switches enjoy the best of both worlds, adapting to the moment’s needs with ease. This style is versatile, playful, and thrives on exploration.",
        tips: ["Communicate your mood clearly.", "Experiment with both roles.", "Find partners who enjoy flexibility."]
      },
      Pet: {
        short: "You love being cared for like a cherished companion.",
        long: "Pets revel in affection and play, often adopting animal-like traits in a dynamic of trust and care. It’s about loyalty and fun.",
        tips: ["Choose a playful persona.", "Seek a caring Owner.", "Enjoy the freedom of your role."]
      },
      Little: {
        short: "You embrace a carefree, childlike spirit.",
        long: "Littles find joy in innocence and dependence, often seeking nurturing and protection in a playful, trusting dynamic.",
        tips: ["Set clear boundaries.", "Find a caring partner.", "Explore your playful side."]
      },
      Puppy: {
        short: "You’re playful and loyal like a devoted pup.",
        long: "Puppies bring boundless energy and affection to their dynamic, thriving on play and devotion in a lighthearted bond.",
        tips: ["Embrace your enthusiasm.", "Seek a Trainer or Owner.", "Keep it fun and safe."]
      },
      Kitten: {
        short: "You’re sensual and mischievous like a curious cat.",
        long: "Kittens blend sensuality with a touch of mischief, enjoying affection and play in a dynamic that’s both tender and teasing.",
        tips: ["Play with your charm.", "Find a patient partner.", "Explore sensory delights."]
      },
      Princess: {
        short: "You adore being pampered and adored.",
        long: "Princesses revel in attention and care, embracing a regal yet dependent role that blends innocence with sensuality.",
        tips: ["Set expectations early.", "Seek a doting partner.", "Enjoy your spotlight."]
      },
      'Rope Bunny': {
        short: "You love the art and feel of being bound.",
        long: "Rope Bunnies find excitement in the sensations and trust of bondage, enjoying the creativity and surrender of being tied.",
        tips: ["Learn safety basics.", "Pair with a skilled Rigger.", "Explore different ties."]
      },
      Masochist: {
        short: "You find pleasure in the thrill of pain.",
        long: "Masochists embrace discomfort as a source of joy, often pairing it with submission in a dynamic of trust and intensity.",
        tips: ["Set safe words.", "Find a caring Sadist.", "Know your limits."]
      },
      Prey: {
        short: "You enjoy the thrill of being hunted.",
        long: "Prey thrive on the chase, finding excitement in vulnerability and the dynamic tension of pursuit and capture.",
        tips: ["Establish consent clearly.", "Pair with a Hunter.", "Enjoy the adrenaline."]
      },
      Toy: {
        short: "You love being used and played with.",
        long: "Toys delight in being an object of pleasure, offering adaptability and submission in a dynamic of control and fun.",
        tips: ["Communicate preferences.", "Find a creative partner.", "Embrace your role."]
      },
      Doll: {
        short: "You enjoy being shaped and admired.",
        long: "Dolls find fulfillment in being molded and displayed, blending vulnerability with a desire to please and be perfect.",
        tips: ["Set clear boundaries.", "Seek a Puppeteer.", "Enjoy your transformation."]
      },
      Bunny: {
        short: "You’re playful and sweet like a hopping rabbit.",
        long: "Bunnies bring innocence and energy to their dynamic, thriving on affection and lighthearted play.",
        tips: ["Keep it fun.", "Find a gentle partner.", "Hop into your role."]
      },
      Servant: {
        short: "You find joy in serving and pleasing.",
        long: "Servants dedicate themselves to their partner’s needs, finding satisfaction in obedience and structured tasks.",
        tips: ["Define your duties.", "Seek a Master or Mistress.", "Balance service with self-care."]
      },
      Playmate: {
        short: "You love sharing fun and mischief.",
        long: "Playmates bring a spirit of camaraderie and adventure, enjoying a dynamic filled with games and exploration.",
        tips: ["Keep it light.", "Find a playful partner.", "Explore together."]
      },
      Babygirl: {
        short: "You crave nurturing and affection.",
        long: "Babygirls blend innocence with dependence, seeking a caring dynamic filled with love and protection.",
        tips: ["Set emotional boundaries.", "Find a Daddy or Mommy.", "Embrace your softness."]
      },
      Captive: {
        short: "You relish the thrill of being held.",
        long: "Captives enjoy the intensity of surrender and restraint, finding excitement in a dynamic of control and trust.",
        tips: ["Negotiate scenes carefully.", "Pair with a Hunter.", "Enjoy the intensity."]
      },
      Thrall: {
        short: "You’re bound by deep devotion.",
        long: "Thralls offer complete loyalty and submission, thriving in a dynamic of profound trust and surrender.",
        tips: ["Build trust slowly.", "Seek a Master.", "Honor your commitment."]
      },
      Dominant: {
        short: "You shine when you’re in charge, guiding with confidence.",
        long: "Dominants revel in control, leading with strength and care to create harmony. This role is about responsibility, trust, and the art of guiding another’s surrender.",
        tips: ["Listen to your partner’s needs.", "Balance firmness with kindness.", "Learn safe practices."]
      },
      Assertive: {
        short: "You lead with bold, decisive energy.",
        long: "Assertives take charge with confidence and intensity, thriving in dynamics where their authority shapes the scene.",
        tips: ["Stay clear and direct.", "Pair with a Submissive.", "Temper boldness with care."]
      },
      Nurturer: {
        short: "You guide with warmth and care.",
        long: "Nurturers blend control with empathy, creating a dynamic where guidance feels like a warm embrace. It’s about support and growth.",
        tips: ["Be patient and attentive.", "Pair with a Little or Pet.", "Foster trust and safety."]
      },
      Strict: {
        short: "You enforce rules with unwavering precision.",
        long: "Stricts maintain order and discipline, finding satisfaction in structure and obedience. This style is firm but fair.",
        tips: ["Set clear expectations.", "Pair with a Slave or Servant.", "Reward compliance."]
      },
      Master: {
        short: "You lead with authority and deep responsibility.",
        long: "Masters take on a profound role, guiding their partner with a blend of control, care, and commitment. This style often involves a structured, trusting dynamic.",
        tips: ["Build trust gradually.", "Understand your partner’s needs.", "Negotiate all terms clearly."]
      },
      Mistress: {
        short: "You command with grace and power.",
        long: "Mistresses lead with confidence and creativity, often blending sensuality with control in a dynamic that’s both elegant and intense.",
        tips: ["Embrace your power.", "Pair with a Slave or Toy.", "Explore creative control."]
      },
      Daddy: {
        short: "You protect and nurture with a firm hand.",
        long: "Daddies blend care with authority, offering guidance and structure in a dynamic that’s both loving and firm.",
        tips: ["Be consistent.", "Pair with a Little or Babygirl.", "Balance discipline with affection."]
      },
      Mommy: {
        short: "You nurture and guide with warmth.",
        long: "Mommies offer a blend of care and control, creating a safe space for their partner to explore and grow.",
        tips: ["Be patient and loving.", "Pair with a Little or Pet.", "Encourage growth."]
      },
      Owner: {
        short: "You take pride in possessing and caring for your partner.",
        long: "Owners find fulfillment in control and responsibility, often in dynamics involving pet play or total power exchange.",
        tips: ["Set clear rules.", "Pair with a Pet or Slave.", "Provide structure and care."]
      },
      Rigger: {
        short: "You’re an artist of restraint and sensation.",
        long: "Riggers excel in the art of bondage, creating intricate ties that blend creativity with control and trust.",
        tips: ["Learn safety techniques.", "Pair with a Rope Bunny.", "Explore different styles."]
      },
      Sadist: {
        short: "You find joy in giving pain with care.",
        long: "Sadists enjoy the thrill of inflicting discomfort, always within the bounds of consent and trust. It’s about intensity and connection.",
        tips: ["Negotiate limits.", "Pair with a Masochist.", "Prioritize aftercare."]
      },
      Hunter: {
        short: "You thrive on the chase and capture.",
        long: "Hunters enjoy the dynamic tension of pursuit, finding excitement in the thrill of the hunt and the surrender that follows.",
        tips: ["Establish consent.", "Pair with Prey.", "Enjoy the game."]
      },
      Trainer: {
        short: "You guide with patience and structure.",
        long: "Trainers focus on teaching and molding their partner, often in dynamics involving behavior modification or skill development.",
        tips: ["Be clear and consistent.", "Pair with a Pet or Slave.", "Celebrate progress."]
      },
      Puppeteer: {
        short: "You control with creativity and precision.",
        long: "Puppeteers enjoy directing every move, often in dynamics where their partner becomes an extension of their will.",
        tips: ["Communicate clearly.", "Pair with a Doll or Toy.", "Explore your vision."]
      },
      Protector: {
        short: "You lead with strength and care.",
        long: "Protectors blend authority with a deep sense of responsibility, ensuring their partner feels safe and valued.",
        tips: ["Be vigilant and kind.", "Pair with a Little or Pet.", "Foster trust."]
      },
      Disciplinarian: {
        short: "You enforce rules with a firm, steady hand.",
        long: "Disciplinarians excel at setting boundaries and maintaining order, often enjoying the challenge of guiding a playful or resistant partner.",
        tips: ["Be clear about rules.", "Stay patient and fair.", "Reward compliance."]
      },
      Caretaker: {
        short: "You nurture and support with love.",
        long: "Caretakers provide a safe, loving space for their partner to explore their role, often in dynamics involving age play or pet play.",
        tips: ["Be attentive and gentle.", "Pair with a Little or Pet.", "Encourage exploration."]
      },
      Sir: {
        short: "You lead with honor and respect.",
        long: "Sirs command with a blend of authority and integrity, often in dynamics that value tradition and structure.",
        tips: ["Uphold your values.", "Pair with a Submissive or Slave.", "Lead by example."]
      },
      Goddess: {
        short: "You’re worshipped and adored.",
        long: "Goddesses embody power and grace, often in dynamics where their partner offers devotion and service.",
        tips: ["Embrace your divinity.", "Pair with a Thrall or Servant.", "Set high standards."]
      },
      Commander: {
        short: "You lead with strategic control.",
        long: "Commanders take charge with precision and vision, often in dynamics that involve complex scenes or power exchange.",
        tips: ["Plan carefully.", "Pair with a Switch or Submissive.", "Execute with confidence."]
      }
    };

    // Dynamic matches for each style
    this.dynamicMatches = {
      Submissive: {
        dynamic: "Power Exchange",
        match: "Dominant",
        desc: "A classic duo where trust flows freely.",
        longDesc: "This dynamic thrives on mutual respect and clear roles."
      },
      Brat: {
        dynamic: "Taming Play",
        match: "Disciplinarian",
        desc: "A fun push-and-pull full of sparks!",
        longDesc: "The Brat’s resistance meets the Disciplinarian’s control."
      },
      Slave: {
        dynamic: "Master/Slave",
        match: "Master",
        desc: "A bond built on deep trust.",
        longDesc: "High power exchange with devotion and structure."
      },
      Switch: {
        dynamic: "Versatile Play",
        match: "Switch",
        desc: "A fluid exchange of power.",
        longDesc: "Both partners explore leading and following."
      },
      Pet: {
        dynamic: "Pet Play",
        match: "Owner",
        desc: "A playful bond of care.",
        longDesc: "Affection and playfulness define this dynamic."
      },
      Little: {
        dynamic: "Age Play",
        match: "Caretaker",
        desc: "A nurturing space for innocence.",
        longDesc: "Care and trust create a loving bond."
      },
      Puppy: {
        dynamic: "Pup Play",
        match: "Trainer",
        desc: "A lively bond of play.",
        longDesc: "Energy and discipline in a playful dynamic."
      },
      Kitten: {
        dynamic: "Kitten Play",
        match: "Owner",
        desc: "A sensual connection.",
        longDesc: "Charm and control blend beautifully."
      },
      Princess: {
        dynamic: "Pampering Play",
        match: "Daddy",
        desc: "A regal bond of care.",
        longDesc: "Spoiling meets nurturing structure."
      },
      'Rope Bunny': {
        dynamic: "Bondage Play",
        match: "Rigger",
        desc: "An artistic exchange.",
        longDesc: "Trust and creativity in bondage."
      },
      Masochist: {
        dynamic: "Sadomasochism",
        match: "Sadist",
        desc: "A thrilling exchange.",
        longDesc: "Pain and pleasure in a trusting dynamic."
      },
      Prey: {
        dynamic: "Primal Play",
        match: "Hunter",
        desc: "A wild chase.",
        longDesc: "Pursuit and surrender fuel this bond."
      },
      Toy: {
        dynamic: "Objectification Play",
        match: "Owner",
        desc: "A playful exchange.",
        longDesc: "Control and adaptability shine here."
      },
      Doll: {
        dynamic: "Transformation Play",
        match: "Puppeteer",
        desc: "A creative bond.",
        longDesc: "Shaping and trust define this dynamic."
      },
      Bunny: {
        dynamic: "Bunny Play",
        match: "Caretaker",
        desc: "A sweet bond.",
        longDesc: "Innocence and care in play."
      },
      Servant: {
        dynamic: "Service Play",
        match: "Master",
        desc: "A structured bond.",
        longDesc: "Duty and guidance create harmony."
      },
      Playmate: {
        dynamic: "Adventure Play",
        match: "Playmate",
        desc: "A shared journey.",
        longDesc: "Fun and exploration together."
      },
      Babygirl: {
        dynamic: "Age Play",
        match: "Daddy",
        desc: "A nurturing space.",
        longDesc: "Love and protection in trust."
      },
      Captive: {
        dynamic: "Captivity Play",
        match: "Hunter",
        desc: "An intense bond.",
        longDesc: "Control and surrender thrill here."
      },
      Thrall: {
        dynamic: "Devotion Play",
        match: "Goddess",
        desc: "A deep bond.",
        longDesc: "Loyalty and worship in power."
      },
      Dominant: {
        dynamic: "Power Exchange",
        match: "Submissive",
        desc: "A balanced duo.",
        longDesc: "Guidance meets trust perfectly."
      },
      Assertive: {
        dynamic: "Assertive Control",
        match: "Submissive",
        desc: "A bold exchange.",
        longDesc: "Authority shapes this bond."
      },
      Nurturer: {
        dynamic: "Nurturing Care",
        match: "Little",
        desc: "A warm bond.",
        longDesc: "Care fosters growth here."
      },
      Strict: {
        dynamic: "Discipline Play",
        match: "Slave",
        desc: "A firm bond.",
        longDesc: "Order meets obedience."
      },
      Master: {
        dynamic: "Master/Slave",
        match: "Slave",
        desc: "A deep relationship.",
        longDesc: "Authority and devotion blend."
      },
      Mistress: {
        dynamic: "Mistress/Servant",
        match: "Servant",
        desc: "An elegant bond.",
        longDesc: "Grace and service shine."
      },
      Daddy: {
        dynamic: "Daddy/Little",
        match: "Little",
        desc: "A nurturing bond.",
        longDesc: "Care and play in trust."
      },
      Mommy: {
        dynamic: "Mommy/Little",
        match: "Little",
        desc: "A loving bond.",
        longDesc: "Warmth and growth here."
      },
      Owner: {
        dynamic: "Owner/Pet",
        match: "Pet",
        desc: "A playful bond.",
        longDesc: "Control and care in play."
      },
      Rigger: {
        dynamic: "Bondage Play",
        match: "Rope Bunny",
        desc: "An artistic exchange.",
        longDesc: "Creativity and trust in ties."
      },
      Sadist: {
        dynamic: "Sadomasochism",
        match: "Masochist",
        desc: "A thrilling exchange.",
        longDesc: "Pain meets pleasure safely."
      },
      Hunter: {
        dynamic: "Primal Play",
        match: "Prey",
        desc: "A wild chase.",
        longDesc: "Pursuit fuels this bond."
      },
      Trainer: {
        dynamic: "Training Play",
        match: "Puppy",
        desc: "A structured bond.",
        longDesc: "Discipline and growth."
      },
      Puppeteer: {
        dynamic: "Control Play",
        match: "Doll",
        desc: "A creative bond.",
        longDesc: "Precision shapes this."
      },
      Protector: {
        dynamic: "Protection Play",
        match: "Little",
        desc: "A strong bond.",
        longDesc: "Care and safety here."
      },
      Disciplinarian: {
        dynamic: "Discipline Play",
        match: "Brat",
        desc: "A lively challenge.",
        longDesc: "Control meets defiance."
      },
      Caretaker: {
        dynamic: "Caretaking Play",
        match: "Little",
        desc: "A nurturing bond.",
        longDesc: "Love and exploration."
      },
      Sir: {
        dynamic: "Sir/Submissive",
        match: "Submissive",
        desc: "A respectful bond.",
        longDesc: "Honor and obedience."
      },
      Goddess: {
        dynamic: "Worship Play",
        match: "Thrall",
        desc: "A divine bond.",
        longDesc: "Adoration and service."
      },
      Commander: {
        dynamic: "Command Play",
        match: "Switch",
        desc: "A strategic bond.",
        longDesc: "Control and flexibility."
      }
    };

    // Initialize DOM elements and event listeners
    this.initElements();
    this.addEventListeners();
  }

  initElements() {
    this.elements = {
      styleFinderBtn: document.getElementById('style-finder-btn'),
      styleFinder: document.getElementById('style-finder'),
      closeStyleFinder: document.getElementById('close-style-finder'),
      progressTracker: document.getElementById('progress-tracker'),
      stepContent: document.getElementById('step-content'),
      feedback: document.getElementById('feedback'),
      dashboard: document.getElementById('dashboard'),
      themeToggle: document.getElementById('theme-toggle')
    };
  }

  addEventListeners() {
    this.elements.styleFinderBtn.addEventListener('click', () => {
      this.styleFinderActive = true;
      this.styleFinderStep = 0;
      this.styleFinderRole = null;
      this.styleFinderAnswers = { traits: {} };
      this.styleFinderScores = {};
      this.hasRenderedDashboard = false;
      this.elements.styleFinder.style.display = 'flex';
      this.renderStyleFinder();
      this.showFeedback("Let’s begin your journey!");
    });

    this.elements.closeStyleFinder.addEventListener('click', () => {
      this.styleFinderActive = false;
      this.elements.styleFinder.style.display = 'none';
    });

    this.elements.themeToggle.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.body.setAttribute('data-theme', newTheme);
      this.elements.themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
    });
  }

  computeCurrentScores() {
    let scores = {};
    if (!this.styleFinderRole) return scores;
    const roleStyles = this.styles[this.styleFinderRole];
    roleStyles.forEach(style => { scores[style] = 0; });

    const styleKeyTraits = {
      'Submissive': ['obedience', 'submissionDepth', 'vulnerability'],
      'Brat': ['rebellion', 'mischief', 'playfulness'],
      'Slave': ['service', 'devotion', 'submissionDepth'],
      'Switch': ['adaptability', 'exploration', 'playfulness'],
      'Pet': ['affection', 'playfulness', 'devotion'],
      'Little': ['innocence', 'dependence', 'affection'],
      'Puppy': ['playfulness', 'devotion', 'affection'],
      'Kitten': ['sensuality', 'mischief', 'affection'],
      'Princess': ['sensuality', 'innocence', 'dependence'],
      'Rope Bunny': ['sensuality', 'exploration', 'submissionDepth'],
      'Masochist': ['painTolerance', 'submissionDepth', 'vulnerability'],
      'Prey': ['exploration', 'vulnerability', 'rebellion'],
      'Toy': ['submissionDepth', 'adaptability', 'service'],
      'Doll': ['vulnerability', 'dependence', 'sensuality'],
      'Bunny': ['playfulness', 'innocence', 'affection'],
      'Servant': ['service', 'obedience', 'devotion'],
      'Playmate': ['playfulness', 'mischief', 'exploration'],
      'Babygirl': ['dependence', 'innocence', 'affection'],
      'Captive': ['submissionDepth', 'vulnerability', 'exploration'],
      'Thrall': ['devotion', 'submissionDepth', 'dependence'],
      'Dominant': ['authority', 'confidence', 'leadership'],
      'Assertive': ['boldness', 'intensity', 'authority'],
      'Nurturer': ['care', 'empathy', 'patience'],
      'Strict': ['discipline', 'control', 'precision'],
      'Master': ['authority', 'possession', 'dominanceDepth'],
      'Mistress': ['confidence', 'creativity', 'dominanceDepth'],
      'Daddy': ['care', 'possession', 'empathy'],
      'Mommy': ['care', 'patience', 'empathy'],
      'Owner': ['possession', 'control', 'dominanceDepth'],
      'Rigger': ['creativity', 'precision', 'control'],
      'Sadist': ['sadism', 'intensity', 'control'],
      'Hunter': ['boldness', 'leadership', 'intensity'],
      'Trainer': ['patience', 'discipline', 'leadership'],
      'Puppeteer': ['control', 'creativity', 'precision'],
      'Protector': ['care', 'authority', 'possession'],
      'Disciplinarian': ['discipline', 'authority', 'precision'],
      'Caretaker': ['care', 'empathy', 'patience'],
      'Sir': ['authority', 'confidence', 'leadership'],
      'Goddess': ['confidence', 'intensity', 'dominanceDepth'],
      'Commander': ['authority', 'intensity', 'dominanceDepth']
    };

    Object.keys(this.styleFinderAnswers.traits).forEach(trait => {
      const rating = this.styleFinderAnswers.traits[trait] || 0;
      this.styles[this.styleFinderRole].forEach(style => {
        const keyTraits = styleKeyTraits[style] || [];
        if (keyTraits.includes(trait)) {
          scores[style] += rating * 1.5;
        }
      });
    });

    return scores;
  }

  updateDashboard() {
    const totalSteps = this.getTotalSteps();
    if (!this.styleFinderRole || this.styleFinderStep <= 1 || this.styleFinderStep >= totalSteps - 2) {
      this.elements.dashboard.style.display = 'none';
      return;
    }
    this.elements.dashboard.style.display = 'block';

    const scores = this.computeCurrentScores();
    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);

    if (!this.previousScores) this.previousScores = {};
    const previousPositions = {};
    Object.entries(this.previousScores).forEach(([style], index) => {
      previousPositions[style] = index;
    });

    const isFirstRender = !this.hasRenderedDashboard;
    let dashboardHTML = "<div class='dashboard-header'>✨ Your Live Vibes! ✨</div>";
    const styleIcons = {
      'Submissive': '🙇', 'Brat': '😈', 'Slave': '🔗', 'Switch': '🔄', 'Pet': '🐾',
      'Little': '🍼', 'Puppy': '🐶', 'Kitten': '🐱', 'Princess': '👑', 'Rope Bunny': '🪢',
      'Masochist': '💥', 'Prey': '🏃', 'Toy': '🎲', 'Doll': '🎎', 'Bunny': '🐰',
      'Servant': '🧹', 'Playmate': '🎉', 'Babygirl': '🌸', 'Captive': '⛓️', 'Thrall': '🛐',
      'Dominant': '👤', 'Assertive': '💪', 'Nurturer': '🤗', 'Strict': '📏', 'Master': '🎓',
      'Mistress': '👸', 'Daddy': '👨‍🏫', 'Mommy': '👩‍🏫', 'Owner': '🔑', 'Rigger': '🪢',
      'Sadist': '😏', 'Hunter': '🏹', 'Trainer': '🏋️', 'Puppeteer': '🎭', 'Protector': '🛡️',
      'Disciplinarian': '✋', 'Caretaker': '🧡', 'Sir': '🎩', 'Goddess': '🌟', 'Commander': '⚔️'
    };

    sortedScores.forEach(([style, score], index) => {
      const prevPos = previousPositions[style] !== undefined ? previousPositions[style] : index;
      const movement = prevPos - index;
      let moveIndicator = '';
      if (movement > 0) moveIndicator = '<span class="move-up">↑</span>';
      else if (movement < 0) moveIndicator = '<span class="move-down">↓</span>';

      const prevScore = this.previousScores[style] || 0;
      const delta = Math.abs(score - prevScore) > 0.1 ? `<span class="score-delta ${score - prevScore > 0 ? 'positive' : 'negative'}">${score - prevScore > 0 ? '+' : ''}${(score - prevScore).toFixed(1)}</span>` : '';

      const animationStyle = isFirstRender ? 'style="animation: slideIn 0.3s ease;"' : '';
      dashboardHTML += `
        <div class="dashboard-item" ${animationStyle}>
          <span class="style-name">${styleIcons[style] || '🌟'} ${style}</span>
          <span class="dashboard-score">${score.toFixed(1)} ${delta} ${moveIndicator}</span>
        </div>
      `;
    });

    this.elements.dashboard.innerHTML = dashboardHTML;
    this.previousScores = { ...scores };
    this.hasRenderedDashboard = true;
  }

  getTotalSteps() {
    const steps = [];
    steps.push({ type: 'welcome' });
    steps.push({ type: 'role' });
    if (this.styleFinderRole) {
      const traitSet = (this.styleFinderRole === 'dominant' ? this.domFinderTraits : this.subFinderTraits);
      traitSet.forEach(trait => steps.push({ type: 'trait', trait: trait.name }));
    }
    steps.push({ type: 'roundSummary', round: 'Traits' });
    steps.push({ type: 'result' });
    return steps.length;
  }

  renderStyleFinder() {
    if (!this.styleFinderActive || !this.elements.stepContent) return;

    const steps = [];
    steps.push({ type: 'welcome' });
    steps.push({ type: 'role' });
    if (this.styleFinderRole) {
      const traitSet = (this.styleFinderRole === 'dominant' ? this.domFinderTraits : this.subFinderTraits);
      traitSet.forEach(trait => steps.push({ type: 'trait', trait: trait.name }));
    }
    steps.push({ type: 'roundSummary', round: 'Traits' });
    steps.push({ type: 'result' });

    if (this.styleFinderStep >= steps.length) this.styleFinderStep = steps.length - 1;
    const step = steps[this.styleFinderStep];
    if (!step) return;
    let html = "";

    if (step.type === 'trait' && this.styleFinderRole) {
      const traitSet = (this.styleFinderRole === 'dominant' ? this.domFinderTraits : this.subFinderTraits);
      const currentTraitIndex = traitSet.findIndex(t => t.name === step.trait);
      const questionsLeft = traitSet.length - (currentTraitIndex + 1);
      this.elements.progressTracker.style.display = 'block';
      this.elements.progressTracker.innerHTML = `Questions Left: ${questionsLeft}`;
    } else {
      this.elements.progressTracker.style.display = 'none';
    }

    switch (step.type) {
      case 'welcome':
        html += `
          <h2>Welcome, Brave Explorer!</h2>
          <p>Dive into a quest to find your BDSM style!</p>
          <button onclick="styleFinderApp.nextStyleFinderStep()">Start the Journey!</button>
        `;
        break;
      case 'role':
        html += `
          <h2>Pick Your Path!</h2>
          <p>Are you a cuddly supporter or a steady leader?</p>
          <button onclick="styleFinderApp.setStyleFinderRole('submissive')">Supporter Vibes!</button>
          <button onclick="styleFinderApp.setStyleFinderRole('dominant')">Leader Vibes!</button>
        `;
        break;
      case 'trait':
        const traitSet = (this.styleFinderRole === 'dominant' ? this.domFinderTraits : this.subFinderTraits);
        const traitObj = traitSet.find(t => t.name === step.trait);
        const currentValue = this.styleFinderAnswers.traits[traitObj.name] !== undefined ? this.styleFinderAnswers.traits[traitObj.name] : 5;
        const footnoteSet = (this.styleFinderRole === 'dominant' ? this.domTraitFootnotes : this.subTraitFootnotes);
        const isFirstTrait = this.styleFinderStep === 2;
        const desc = this.sliderDescriptions[traitObj.name] || this.sliderDescriptions['obedience'];
        html += `
          <h2>${traitObj.desc}<span class="info-icon" onclick="styleFinderApp.showTraitInfo('${traitObj.name}')">ℹ️</span></h2>
          ${isFirstTrait ? '<p>Slide to find your vibe! (1 = Not Me, 10 = Totally Me)</p>' : ''}
          <input type="range" min="1" max="10" value="${currentValue}" class="trait-slider" 
                 oninput="styleFinderApp.setStyleFinderTrait('${traitObj.name}', this.value); 
                          document.getElementById('desc-${traitObj.name}').textContent = styleFinderApp.sliderDescriptions['${traitObj.name}'][this.value - 1]; 
                          styleFinderApp.updateDashboard();">
          <div id="desc-${traitObj.name}" class="slider-description">${desc[currentValue - 1]}</div>
          <p class="slider-footnote">${footnoteSet[traitObj.name]}</p>
          <div style="margin-top: 15px;">
            <button onclick="styleFinderApp.nextStyleFinderStep('${traitObj.name}')">Next Step!</button>
            <button onclick="styleFinderApp.prevStyleFinderStep()" style="background: #ccc; margin-left: 10px;">Back</button>
          </div>
        `;
        break;
      case 'roundSummary':
        const topTraits = Object.entries(this.styleFinderAnswers.traits)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([trait]) => trait);
        html += `
          <h2>${step.round} Check-In!</h2>
          <p>Here’s how your choices are shaping up:</p>
          <div id="summary-dashboard">${this.generateSummaryDashboard()}</div>
          ${topTraits.length ? `<p><em>Your Top Traits:</em> ${topTraits.join(', ')}</p>` : ''}
          <button onclick="styleFinderApp.nextStyleFinderStep()">See Results!</button>
          <button onclick="styleFinderApp.prevStyleFinderStep()" style="background: #ccc;">Back</button>
        `;
        break;
      case 'result':
  this.calculateStyleFinderResult();
  const topStyles = Object.entries(this.styleFinderScores).sort((a, b) => b[1] - a[1]).slice(0, 2);
  const topStyle = topStyles[0][0];
  const match = this.dynamicMatches[topStyle];
  html += `
    <div class="result-section">
      <h2 class="result-heading">Your Style</h2>
      <h3>You’re a ${topStyle}!</h3>
      <p>${this.styleDescriptions[topStyle].short}
        <span class="info-icon" onclick="styleFinderApp.showStyleInfo('${topStyle}')">Learn More!</span></p>
      <p><strong>Score:</strong> ${topStyles[0][1].toFixed(1)}</p>
        ${topStyles[1] ? `
          <p><strong>Runner-Up:</strong> ${topStyles[1][0]} (${topStyles[1][1].toFixed(1)})
            <span class="info-icon" onclick="styleFinderApp.showStyleInfo('${topStyles[1][0]}')">Learn More!</span></p>
          ` : ''}
    </div>
    <div class="result-section">
      <h2 class="result-heading">Style Tips</h2>
      <ul style="list-style-type: none; padding-left: 0;">
        ${this.styleDescriptions[topStyle].tips.map(tip => `<li>🌸 ${tip}</li>`).join('')}
      </ul>
    </div>
    <div class="result-section">
      <h2 class="result-heading">Your Dynamic Match</h2>
      <p><em>${match.dynamic}</em>: ${match.desc}
        <span class="info-icon" onclick="styleFinderApp.showDynamicInfo('${topStyle}', 'dynamic')">Learn More!</span></p>
      <p><strong>Look for a:</strong> ${match.match} - They’d complement your vibe perfectly!
        <span class="info-icon" onclick="styleFinderApp.showDynamicInfo('${topStyle}', 'match')">Learn More!</span></p>
    </div>
    <div class="result-buttons">
      <button onclick="styleFinderApp.saveAsCertificate()">Save as Certificate</button>
      <button onclick="styleFinderApp.shareResult()">Share with a Friend!</button>
      <button onclick="styleFinderApp.restart()">Try Again!</button>
      <button onclick="styleFinderApp.prevStyleFinderStep()" style="background: #ccc;">Back</button>
    </div>
  `;
  setTimeout(() => {
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
  }, 500);
  break;
    }

    this.elements.stepContent.innerHTML = html;
    this.elements.stepContent.classList.add('fade-in');
    setTimeout(() => this.elements.stepContent.classList.remove('fade-in'), 300);
    this.updateDashboard();
  }

  generateSummaryDashboard() {
    if (!this.styleFinderRole) return "No scores yet! Pick a role first!";
    const scores = this.computeCurrentScores();
    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    let summaryHTML = "<ul style='list-style-type: none; padding-left: 0;'>";
    sortedScores.forEach(([style, score]) => {
      summaryHTML += `<li>${style}: ${score.toFixed(1)}</li>`;
    });
    summaryHTML += "</ul>";
    return summaryHTML;
  }

  setStyleFinderRole(role) {
    this.styleFinderRole = role;
    this.styleFinderAnswers.traits = {}; // Reset traits, no default values here
    this.styleFinderStep++;
    this.renderStyleFinder();
    this.showFeedback(role === 'submissive' ? "Supporter mode activated!" : "Leader mode engaged!");
  }

  setStyleFinderTrait(trait, value) {
    this.styleFinderAnswers.traits[trait] = parseInt(value);
    this.updateDashboard();
  }

  nextStyleFinderStep(currentTrait = null) {
    if (currentTrait) {
      const slider = document.querySelector('.trait-slider');
      if (slider && this.styleFinderAnswers.traits[currentTrait] === undefined) {
        this.styleFinderAnswers.traits[currentTrait] = parseInt(slider.value);
      }
    }
    this.styleFinderStep++;
    this.renderStyleFinder();
    this.showFeedback();
  }

  prevStyleFinderStep() {
    if (this.styleFinderStep > 0) {
      this.styleFinderStep--;
      this.renderStyleFinder();
    }
  }

  calculateStyleFinderResult() {
    if (!this.styleFinderRole) return;
    const roleStyles = this.styles[this.styleFinderRole];
    roleStyles.forEach(style => {
      this.styleFinderScores[style] = 0;
    });

    const styleKeyTraits = {
      'Submissive': ['obedience', 'submissionDepth', 'vulnerability'],
      'Brat': ['rebellion', 'mischief', 'playfulness'],
      'Slave': ['service', 'devotion', 'submissionDepth'],
      'Switch': ['adaptability', 'exploration', 'playfulness'],
      'Pet': ['affection', 'playfulness', 'devotion'],
      'Little': ['innocence', 'dependence', 'affection'],
      'Puppy': ['playfulness', 'devotion', 'affection'],
      'Kitten': ['sensuality', 'mischief', 'affection'],
      'Princess': ['sensuality', 'innocence', 'dependence'],
      'Rope Bunny': ['sensuality', 'exploration', 'submissionDepth'],
      'Masochist': ['painTolerance', 'submissionDepth', 'vulnerability'],
      'Prey': ['exploration', 'vulnerability', 'rebellion'],
      'Toy': ['submissionDepth', 'adaptability', 'service'],
      'Doll': ['vulnerability', 'dependence', 'sensuality'],
      'Bunny': ['playfulness', 'innocence', 'affection'],
      'Servant': ['service', 'obedience', 'devotion'],
      'Playmate': ['playfulness', 'mischief', 'exploration'],
      'Babygirl': ['dependence', 'innocence', 'affection'],
      'Captive': ['submissionDepth', 'vulnerability', 'exploration'],
      'Thrall': ['devotion', 'submissionDepth', 'dependence'],
      'Dominant': ['authority', 'confidence', 'leadership'],
      'Assertive': ['boldness', 'intensity', 'authority'],
      'Nurturer': ['care', 'empathy', 'patience'],
      'Strict': ['discipline', 'control', 'precision'],
      'Master': ['authority', 'possession', 'dominanceDepth'],
      'Mistress': ['confidence', 'creativity', 'dominanceDepth'],
      'Daddy': ['care', 'possession', 'empathy'],
      'Mommy': ['care', 'patience', 'empathy'],
      'Owner': ['possession', 'control', 'dominanceDepth'],
      'Rigger': ['creativity', 'precision', 'control'],
      'Sadist': ['sadism', 'intensity', 'control'],
      'Hunter': ['boldness', 'leadership', 'intensity'],
      'Trainer': ['patience', 'discipline', 'leadership'],
      'Puppeteer': ['control', 'creativity', 'precision'],
      'Protector': ['care', 'authority', 'possession'],
      'Disciplinarian': ['discipline', 'authority', 'precision'],
      'Caretaker': ['care', 'empathy', 'patience'],
      'Sir': ['authority', 'confidence', 'leadership'],
      'Goddess': ['confidence', 'intensity', 'dominanceDepth'],
      'Commander': ['authority', 'intensity', 'dominanceDepth']
    };

    this.styles[this.styleFinderRole].forEach(style => {
      const keyTraits = styleKeyTraits[style] || [];
      keyTraits.forEach(trait => {
        const rating = this.styleFinderAnswers.traits[trait] || 0;
        this.styleFinderScores[style] += rating * 1.5;
      });
    });
  }

  showFeedback(message) {
    if (!this.elements.feedback) return;
    const funMessages = [
      "You’re a sparkly unicorn! - ✨🦄",
      "Vibing like a fluffy cloud! - 🌈☁️",
      "Eeee, so adorable! - 🐾💕",
      "Zooming with kitten power! - 🚀😽",
      "Pawsitively precious! - 🐱🌸",
      "Sparklies everywhere, yay! - ⚡️✨",
      "Glowy lil’ star alert! - 🌟🐾",
      "Firecracker cutie pie! - 🎆💖",
      "Bouncing bunny vibes! - 🐰🌼",
      "Sweet as candy, wow! - 🍬😻",
      "Treasure chest of cute! - 💎💞",
      "Twirly whirly adorbs! - 🌀✨",
      "Purring perfection! - 😻🌈",
      "Blooming like a flower! - 🌸💕",
      "Tiny hero energy! - 💪🐾"
    ];
    this.elements.feedback.textContent = message || funMessages[Math.floor(Math.random() * funMessages.length)];
    this.elements.feedback.classList.add("feedback-animation");
    setTimeout(() => this.elements.feedback.classList.remove("feedback-animation"), 2000);
  }

  showTraitInfo(trait) {
    const explanation = this.traitExplanations[trait] || "No detailed info available for this trait yet!";
    const popup = document.createElement('div');
    popup.className = 'style-info-popup';
    popup.innerHTML = `
      <h3>About "${trait}"</h3>
      <p>${explanation}</p>
      <button class="close-btn" onclick="this.parentElement.remove()">✖</button>
    `;
    document.body.appendChild(popup);
  }

  showStyleInfo(style) {
    const desc = this.styleDescriptions[style];
    const popup = document.createElement('div');
    popup.className = 'style-info-popup';
    popup.innerHTML = `
      <h3>${style}</h3>
      <p>${desc.long}</p>
      <button class="close-btn" onclick="this.parentElement.remove()">✖</button>
    `;
    document.body.appendChild(popup);
  }

  showDynamicInfo(style, type) {
    const match = this.dynamicMatches[style];
    if (!match) {
      alert("No dynamic match information available for this style.");
      return;
    }

    const popup = document.createElement('div');
    popup.className = 'style-info-popup';
    let title, description;

    if (type === 'dynamic') {
      title = match.dynamic || "Dynamic";
      description = match.longDesc || "Description not available.";
    } else {
      const matchStyle = match.match;
      const matchDesc = this.styleDescriptions[matchStyle];
      title = matchStyle || "Match Style";
      description = matchDesc ? matchDesc.long : "Description not available.";
    }

    popup.innerHTML = `
      <h3>${title}</h3>
      <p>${description}</p>
      <button class="close-btn" onclick="this.parentElement.remove()">✖</button>
    `;
    document.body.appendChild(popup);
  }

  /** Save result as a certificate text file */
 saveAsCertificate() {
  const topStyles = Object.entries(this.styleFinderScores).sort((a, b) => b[1] - a[1]).slice(0, 1);
  const topStyle = topStyles[0][0];
  const match = this.dynamicMatches[topStyle];

  // Create a canvas element
  const canvas = document.createElement('canvas');
  canvas.width = 800; // Width in pixels
  canvas.height = 600; // Height in pixels
  const ctx = canvas.getContext('2d');

  // Gradient background (professional yet soft)
  const isDarkTheme = document.body.getAttribute('data-theme') === 'dark';
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  if (isDarkTheme) {
    gradient.addColorStop(0, '#3b233a'); // Darker purple
    gradient.addColorStop(1, '#2b1a2a'); // Dark purple
  } else {
    gradient.addColorStop(0, '#fff0f5'); // Light pink
    gradient.addColorStop(1, '#f8e1e9'); // Softer pink
  }
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Font and color settings
  ctx.fillStyle = isDarkTheme ? '#f8e1e9' : '#3b233a'; // Text color
  ctx.textAlign = 'center';

  // Title
  ctx.font = 'bold 40px Georgia, serif'; // Professional serif font
  ctx.fillStyle = '#ff7096'; // Pink title
  ctx.fillText('BDSM Style Finder Certificate', canvas.width / 2, 80);

  // Subtle decorative line under title
  ctx.strokeStyle = '#ff7096';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(150, 100);
  ctx.lineTo(650, 100);
  ctx.stroke();

  // Main content
  ctx.fillStyle = isDarkTheme ? '#f8e1e9' : '#3b233a';
  ctx.font = '24px Georgia, serif'; // Slightly larger, professional font
  const lines = [
    `Certified Style: ${topStyle}`,
    `${this.styleDescriptions[topStyle].short}`,
    ``,
    `Dynamic Match: ${match.dynamic} with a ${match.match}`,
    `${match.desc}`,
    ``,
    `Tips for Excellence:`,
    ...this.styleDescriptions[topStyle].tips.map(tip => ` • ${tip}`),
  ];

  let y = 150;
  lines.forEach(line => {
    ctx.fillText(line, canvas.width / 2, y);
    y += 35; // Increased line spacing for readability
  });

  // Signature line
  ctx.font = '20px Georgia, serif';
  ctx.fillText('Certified by Style Finder', canvas.width / 2, canvas.height - 80);
  ctx.beginPath();
  ctx.moveTo(300, canvas.height - 60);
  ctx.lineTo(500, canvas.height - 60);
  ctx.stroke();

  // Professional border
  ctx.strokeStyle = '#ff7096';
  ctx.lineWidth = 4;
  ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

  // Corner accents (subtle decoration)
  ctx.fillStyle = '#ff7096';
  ctx.font = '20px Arial';
  ctx.fillText('✨', 50, 50);
  ctx.fillText('✨', canvas.width - 50, 50);
  ctx.fillText('✨', 50, canvas.height - 40);
  ctx.fillText('✨', canvas.width - 50, canvas.height - 40);

  // Convert canvas to PNG and trigger download
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = 'BDSM_Style_Certificate.png';
  link.click();
}


  shareResult() {
    const topStyles = Object.entries(this.styleFinderScores).sort((a, b) => b[1] - a[1]).slice(0, 1);
    const topStyle = topStyles[0][0];
    const text = `I’m a ${topStyle} according to the BDSM Style Finder! Check it out: [Your App URL]`;
    if (navigator.share) {
      navigator.share({
        title: 'My BDSM Style Result',
        text: text,
        url: window.location.href
      }).catch(err => console.log('Share failed:', err));
    } else {
      alert("Sharing isn’t supported here, but here’s your result: " + text);
    }
  }

  restart() {
    this.styleFinderActive = true;
    this.styleFinderStep = 0;
    this.styleFinderRole = null;
    this.styleFinderAnswers = { traits: {} };
    this.styleFinderScores = {};
    this.hasRenderedDashboard = false;
    this.renderStyleFinder();
    this.showFeedback("Fresh start, yay!");
  }
}

const styleFinderApp = new StyleFinderApp();
