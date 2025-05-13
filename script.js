class StyleFinderApp {
  constructor() {
    // Initial state variables
    this.styleFinderActive = false;
    this.styleFinderStep = 0;
    this.styleFinderRole = null;
    this.styleFinderAnswers = { traits: {}, guidingPreference: null, userDefinedKeyTraits: [] };
    this.styleFinderScores = {};
    this.hasRenderedDashboard = false;

    // Curation State Variables
    this.curationModeActive = false;
    this.topArchetypesForCuration = [];
    this.selectedCuratedElements = {};
    this.customArchetypeName = "";
    this.customArchetypeDescription = "";

    // Playground Integration
    this.playgroundApp = null; 
    this.quizCompletedOnce = false; 
    this.lastQuizStepBeforePlayground = null; 

    // --- DATA OBJECTS ---
    // Style categories
    this.styles = {
      submissive: [
        'Brat', 'Little', 'Rope Bunny', 'Masochist', 'Pet', 'Slave', 'Submissive', 'Switch', 'Puppy', 'Kitten', 'Princess',
        'Prey', 'Toy', 'Doll', 'Bunny', 'Servant', 'Playmate', 'Babygirl', 'Captive', 'Thrall',
        'Puppet', 'Maid', 'Painslut', 'Bottom'
      ],
      dominant: [
        'Disciplinarian', 'Master', 'Nurturer', 'Sadist', 'Owner', 'Dominant', 'Assertive', 'Strict', 'Mistress', 'Daddy', 'Mommy', 'Rigger',
        'Hunter', 'Trainer', 'Puppeteer', 'Protector', 'Caretaker', 'Sir', 'Goddess', 'Commander'
      ]
    };
    // Submissive traits
    this.subFinderTraits = [
      { name: 'obedience', desc: 'How deeply do you resonate with following instructions or rules from a trusted guide?' }, { name: 'rebellion', desc: 'Is there a spark of joy in playfully resisting or teasing when someone tries to direct you?' }, { name: 'service', desc: 'How fulfilling is it to assist, perform tasks, or dedicate yourself to another\'s happiness?' }, { name: 'playfulness', desc: 'How much do silly games, lighthearted mischief, or imaginative scenarios call to you?' }, { name: 'sensuality', desc: 'Do soft touches, varied textures, or heightened physical sensations ignite your senses?' }, { name: 'exploration', desc: 'How strong is your desire to venture into new experiences or uncharted territories of sensation?' }, { name: 'devotion', desc: 'Does profound loyalty and unwavering commitment to someone bring you a deep sense of purpose?' }, { name: 'innocence', desc: 'How much do you enjoy embodying a carefree, pure, or even childlike essence in interactions?' }, { name: 'mischief', desc: 'What is your affinity for stirring things up with a cheeky prank or playful, well-intentioned trouble?' }, { name: 'affection', desc: 'How vital is physical closeness, like hugs, cuddles, or gentle nuzzling, for you to feel connected?' }, { name: 'painTolerance', desc: 'Does a spectrum of discomfort, from a light sting to intense sensations, excite or intrigue you?' }, { name: 'submissionDepth', desc: 'How completely do you yearn to let go, entrusting your full control to another?' }, { name: 'dependence', desc: 'Is there comfort and security for you in relying on another for guidance and decision-making?' }, { name: 'vulnerability', desc: 'How natural and right does it feel to open up emotionally, exposing your innermost self?' }, { name: 'adaptability', desc: 'How readily can you shift between different roles, moods, or adjust to new expectations in a dynamic?' }, { name: 'tidiness', desc: 'Do you find satisfaction in maintaining perfect order, cleanliness, and organization for another?' }, { name: 'politeness', desc: 'Does courteous, respectful, and mannered interaction come naturally and feel important to you?' }, { name: 'craving', desc: 'Do you actively seek intense, boundary-pushing sensations or experiences that test your limits?' }, { name: 'receptiveness', desc: 'How open are you to truly receiving direction, sensations, or guidance from another without reservation?' }
    ].sort(() => 0.5 - Math.random());
    this.subTraitFootnotes = {
      obedience: "1: Rarely follows / 10: Always obeys implicitly",rebellion: "1: Utterly compliant / 10: Master of playful defiance",service: "1: Self-focused primarily / 10: Driven by acts of service",playfulness: "1: Generally serious / 10: Embodiment of playful spirit",sensuality: "1: Prefers less sensory input / 10: Craves rich sensory experiences",exploration: "1: Prefers the known / 10: Eagerly seeks the unknown",devotion: "1: Highly independent / 10: Capable of profound devotion",innocence: "1: Feels mature/worldly / 10: Cherishes childlike innocence",mischief: "1: Prefers calm / 10: Delightfully mischievous",affection: "1: Prefers personal space / 10: Craves constant affection",painTolerance: "1: Avoids all pain / 10: Embraces intense sensations",submissionDepth: "1: Enjoys light guidance / 10: Yearns for total surrender",dependence: "1: Fiercely self-reliant / 10: Finds comfort in dependence",vulnerability: "1: Heavily guarded / 10: Naturally open and vulnerable",adaptability: "1: Prefers a fixed role / 10: Highly versatile and fluid",tidiness: "1: Happily chaotic / 10: Devoted to pristine order",politeness: "1: Casual and direct / 10: Epitome of courtesy",craving: "1: Prefers gentle experiences / 10: Seeks extreme thrills",receptiveness: "1: Internally directed / 10: Fully open to external input"
    };
    // Dominant traits
    this.domFinderTraits = [
      { name: 'authority', desc: 'How natural and invigorating is it for you to take command and lead?' },{ name: 'confidence', desc: 'How unwavering is your belief in your decisions and your ability to guide?' },{ name: 'discipline', desc: 'Do you find satisfaction in establishing firm rules and ensuring they are followed?' },{ name: 'boldness', desc: 'How fearlessly do you embrace challenges and navigate new or intense situations?' },{ name: 'care', desc: 'How strong is your instinct to nurture, support, and protect those under your guidance?' },{ name: 'empathy', desc: 'How intuitively do you connect with and understand the emotions and needs of others?' },{ name: 'control', desc: 'How much do you thrive on meticulously directing details and orchestrating outcomes?' },{ name: 'creativity', desc: 'Do you delight in crafting unique scenarios, experiences, or methods of interaction?' },{ name: 'precision', desc: 'How important is meticulous attention to detail and flawless execution to you?' },{ name: 'intensity', desc: 'Do you bring a potent, focused, and powerful energy to your interactions and scenes?' },{ name: 'sadism', desc: 'Does the artful, consensual giving of pain or psychological challenge excite you?' },{ name: 'leadership', desc: 'How naturally do you assume the role of guiding others towards a shared or set goal?' },{ name: 'possession', desc: 'How profound is your sense of pride and responsibility in what (or whom) you consider "yours"?' },{ name: 'patience', desc: 'How calm and steadfast are you while teaching, training, or waiting for compliance?' },{ name: 'dominanceDepth', desc: 'Do you crave a dynamic where your power is absolute and your influence all-encompassing?' }
    ].sort(() => 0.5 - Math.random());
    this.domTraitFootnotes = {
      authority: "1: Prefers to suggest / 10: Naturally commands",confidence: "1: Often hesitant / 10: Unshakeably self-assured",discipline: "1: Very relaxed approach / 10: Enjoys strict structure",boldness: "1: Highly cautious / 10: Fearlessly dives in",care: "1: More detached / 10: Deeply caring and protective",empathy: "1: Logically focused / 10: Highly intuitive and empathetic",control: "1: Prefers to delegate / 10: Craves total control",creativity: "1: Prefers routines / 10: Exceptionally imaginative",precision: "1: Prefers broad strokes / 10: Meticulous to the core",intensity: "1: Gentle and soft / 10: Radiates powerful intensity",sadism: "1: Avoids causing discomfort / 10: Finds artistry in consensual pain",leadership: "1: Prefers to follow / 10: A natural-born leader",possession: "1: Prefers autonomy for all / 10: Deeply possessive and protective",patience: "1: Easily impatient / 10: Endlessly patient",dominanceDepth: "1: Enjoys light influence / 10: Desires complete dominance"
    };
    // Slider Descriptions
    this.sliderDescriptions = {
      obedience: ["A free spirit, you dance to your own beat!","Rules are mere whispers in the wind to you.","You'll consider following, if the mood is right!","A hint of compliance, when it suits your fancy.","Gentle guidance? You can roll with that.","Following instructions can feel surprisingly good.","Pleasing through obedience offers a quiet satisfaction.","'Yes' is a word you offer with thoughtful consideration.","A sweet request often earns your willing accord.","Your 'yes' is a gift, offered with radiant trust."],
      rebellion: ["The soul of compliance, you bend like a willow.","A tiny 'perhaps not' might escape your lips.","You playfully nudge boundaries with a charming smile.","Teasing and testing rules is your delightful game.","A perfect blend of 'yes' and 'no, but make it cute'.","You push back with an irresistible, sparkling charm.","Defiance, for you, is an art form of connection.","A playful 'no' is your favorite kind of 'yes, please'.","Rebellious energy dances in your every move.","You are the star of delightful, cheeky insubordination!"],
      service: ["Your focus is inward, on your own path mostly.","A quick favor is a gesture you might offer.","Helping those who are sweet to you feels natural.","You'll lend a hand when it's convenient and light.","Serving can be okay, a pleasant interlude sometimes.","Making someone smile through service brings you joy.","Assisting others is your quiet happy place.","You cherish the opportunity to perform kind tasks.","You are a sweet angel of devoted helpfulness.","Caring for others through service is your superpower!"],
      playfulness: ["A serious demeanor is your comfortable default.","A rare giggle might escape, surprising even you.","You'll engage in play if it's calm and light-hearted.","Half serious, half silly – a charming balance.","You're warming up to the idea of uninhibited fun!","Playtime is a genuine source of joy and release.","You bounce and bubble with infectious, gleeful energy!","'Silly' and 'fun' are your cherished middle names!","You are a whirlwind of delightful, playful chaos!","Games, imagination, and laughter are your entire world!"],
      sensuality: ["You're not particularly moved by physical textures.","A soft, brief pat is perfectly acceptable.","You appreciate subtle tactile sensations.","Interesting textures can be quite neat and engaging.","You're definitely drawn to soft, comforting vibes.","Silk, velvet, warm skin – these make you happy!","You adore a delightful, teasing sensory tickle.","Touch, taste, scent – these are your bliss!","You are an epicurean of all things sensory!","A true queen/king/monarch of rich sensual experience!"],
      exploration: ["The comfort of the known is your preferred haven.","A tiny, hesitant step into the unfamiliar.","You'll peek curiously at new possibilities.","You'll try new things, if safety is assured.","Half cozy in your comfort zone, half curious about more.","New experiences hold an exciting allure for you!","You eagerly chase the thrill of the unknown!","Adventure and discovery are your lifeblood!","You are a bold, intrepid explorer of all things!","No frontier is too daunting for your adventurous spirit!"],
      devotion: ["You are a fiercely independent, free soul!","A flicker of deep loyalty shows in your eyes.","You care deeply for those in your immediate circle.","Half free-spirited, half deeply true and committed.","You're warming to the idea of profound connection.","Devotion is a gentle, warm glow within you.","You offer your loyalty with a soft, open heart.","Unwavering loyalty is the core of your being.","You are a precious gem of steadfast devotion.","Your soulmate connection is total and absolute!"],
      innocence: ["You possess wisdom far beyond your years.","A touch of childlike wonder peeks through.","You're a charming mix of grown-up and kid-at-heart.","Moments of silly, carefree fun feel good to you.","You're dipping your toes into the sweetness of cute.","Embracing innocence is your delightful vibe.","You are a sweet, gentle dreamer of lovely things.","Giggles and joyful abandon are your signature song.","You radiate pure, unadulterated sunshine!","Totally and wonderfully a kid at heart, always!"],
      mischief: ["You're too good-natured for pranks or tricks.","A tiny, harmless prank might just slip out.","You'll stir the pot a little, if it's all in good fun.","Half calm and composed, half delightfully cheeky.","You possess a sneaky, irresistible spark of fun.","Mischief is your favorite game, played with wit.","You adore creating a little bit of playful chaos!","Trouble, in its most charming form, is your friend!","You are a seasoned professional of mischief!","A true monarch of delightful, artful chaos!"],
      affection: ["Hugs and cuddles? Not really your preference.","A quick, polite cuddle is perfectly fine.","You appreciate a soft, gentle touch from someone trusted.","Half aloof and reserved, half warm and inviting.","You're definitely warming up to the idea of snuggles.","Cuddles and closeness are a genuine source of joy.","You deeply love the feeling of physical closeness.","Affection is a radiant, warm glow you share freely.","You are a superstar of hugs and loving embraces!","A total love bug, craving constant connection!"],
      painTolerance: ["You prefer comfort and ease, tiring quickly from strain.","A little push, a brief moment of intensity, is enough.","You can endure if the experience is engaging and fun.","You're steady and can handle moderate discomfort for a while.","Halfway there – you're showing good resilience!","You keep going strong, pushing through challenges.","Endurance and resilience are becoming your strengths.","You're tough, ready, and can handle significant intensity.","You seem to never stop, an icon of perseverance!","A true marathon champion of enduring sensation!"],
      submissionDepth: ["You are as free as a bird, your will your own.","A little flicker of yielding peeks out sometimes.","You'll bend to another's will if it's a chill, easy request.","Half your own director, half open to their guidance.","You're easing into the comfort of letting go.","Surrender, you're discovering, can be quite fun!","You dive into submission with a soft, trusting heart.","Their control feels right, a joyful release for you.","You are all theirs, completely and blissfully.","A total star of trusting, profound surrender!"],
      dependence: ["Solo and self-reliant is your natural jam.","A little lean for support slips in occasionally.","You'll lean on someone if they're kind and trustworthy.","Half fiercely independent, half yearning for support.","You're becoming okay with asking for and accepting help.","Relying on a trusted someone feels surprisingly good.","You love the feeling of their guidance and support.","They are your rock, your safe harbor in any storm.","You are a pro at leaning in and trusting deeply.","A total trust buddy, thriving on mutual reliance!"],
      vulnerability: ["Your walls are high, your inner self well-guarded.","A tiny peek of your true feelings slips out.","You'll share a little, if you feel completely safe.","Half guarded and cautious, half tentatively open.","You're softening, allowing your true self to emerge.","Being open and vulnerable is becoming your vibe.","You bare your heart softly, with growing trust.","Your heart is wide open, a beacon of authenticity.","You are a rare gem of profound trust and openness.","A total soul-sharer, fearlessly authentic!"],
      adaptability: ["One way, one role – you're set and comfortable.","A tiny switch in approach is fine by you.","You can bend and flex a little when needed.","Half fixed in your ways, half fluid and changeable.","You're generally okay with changes and new roles.","Switching gears and roles comes easily to you.","You roll with the punches, adapting with grace.","Flexibility and versatility are your superpowers!","You flip between modes and roles like a seasoned pro!","A total chameleon, mastering every hue of interaction!"],
      tidiness: ["Beautiful chaos is your happy, natural state!","A little bit of mess just means life is happening!","You'll tidy up if asked nicely, or if it's easy.","Order is okay sometimes, in small, manageable doses.","You generally like things to be neat-ish and presentable.","A sense of cleanliness and order feels good to you.","You genuinely love a tidy, well-organized space.","Order and meticulousness bring you a deep sense of joy.","Spotless, pristine perfection is your ultimate vibe.","Perfection in every nook and cranny is your signature!"],
      politeness: ["You're refreshingly blunt, bold, and direct!","A bit gruff on the surface, but sweet underneath.","You'll be polite if it's easy and doesn't take effort.","You're generally nice and considerate when needed.","Courtesy and good manners are your default setting.","You are a true gem of polite and respectful interaction.","Your manners shine brightly, a beacon of grace.","Respect for others is at the very core of your being.","You are unfailingly, super courteous and considerate.","The reigning monarch of politeness and refined grace!"],
      craving: ["Calm, gentle, and serene is your preferred zone.","A tiny thrill, a small spark of intensity, is enough.","You'll dip your toes into more intense experiences.","Half chill and relaxed, half drawn to wilder sensations.","You definitely like a strong, invigorating spark!","Intensity has a magnetic pull, calling your name!","You actively chase the exhilarating edge of experience!","Thrills and potent sensations are your life's fuel!","You crave the extreme, the unforgettable, the peak!","A limitless seeker of profound, transformative intensity!"],
      receptiveness: ["You are primarily your own guide, internally directed.","You're a bit open to input, if you feel safe and respected.","You'll listen and consider, if guidance is clear and kind.","Half closed off and self-contained, half open to new input.","You're warming up, becoming more receptive to others.","Openness to receiving feels increasingly right and good.","You take it all in, absorbing guidance and sensation.","External guidance is welcome, a valued part of the dance.","You are a pro at receiving, a master of attunement.","Totally in tune, a perfect conduit for connection!"],
      authority: ["Soft, gentle, and perhaps a little shy in leading.","A little spark of leadership peeks through at times.","You'll guide if asked, or if the situation truly needs it.","Half gentle and suggestive, half firm and directive.","You're stepping up, finding your voice of command.","Embracing authority feels natural and invigorating.","You lead with an easy, confident, and clear presence.","You are a strong, capable, and inspiring guide.","Full boss mode activated, and it looks good on you!","A total commander, born to lead with grace and power!"],
      confidence: ["Quiet, unsure, and often seeking reassurance.","A bit of boldness and self-assurance shows through.","You feel sure of yourself if the task is easy or familiar.","Half shy and hesitant, half steady and composed.","You're growing bolder, trusting your instincts more.","Your inner confidence is beginning to truly shine!","You trust your gut, and your decisions are sound.","You are rock solid, a beacon of self-assurance.","Bold, bright, and radiating unwavering confidence!","A total powerhouse of belief in yourself and your vision!"],
      discipline: ["Free, wild, and wonderfully unstructured!","A single, simple rule might slip into your approach.","You set soft lines, gentle boundaries for interaction.","Half loose and go-with-the-flow, half liking some order.","You're discovering a fondness for structure and order.","Discipline, you find, is your jam for creating clarity.","You keep things firm, fair, and consistently applied.","Rules and structure are your strength, your framework.","You're super strict, a master of well-defined parameters.","Total control through clear, unbending discipline!"],
      boldness: ["Careful, calm, and preferring the path of caution.","A little risk, a small leap, peeks out sometimes.","You'll take a leap if you feel safe and supported.","Half shy and hesitant, half daring and adventurous.","You're getting braver, embracing new challenges!","Boldness is becoming your signature style!","You dive right into the heart of the action!","Fearless vibes radiate from your every move!","You are a brilliant star of courage and daring!","A total daredevil, thriving on exhilarating risks!"],
      care: ["Cool, aloof, and maintaining a certain distance.","A moment of genuine care slips out, soft and warm.","You'll help and support if asked, or if it's simple.","Half chill and detached, half warm and nurturing.","You're a soft, gentle guide, offering quiet support.","Nurturing and protecting others is your gentle glow.","You protect with a fierce love and tender devotion.","Deep, profound care is at the core of your being.","You are a warm, shining star of loving kindness.","A total nurturer, your heart a haven of compassion!"],
      empathy: ["Distant, chill, and observing from afar.","A flicker of understanding, a shared feeling, peeks out.","You 'get it' if things are explained clearly and logically.","Half aloof and objective, half tuned into others' feelings.","You're sensing more, feeling the emotional currents.","Empathy is your unique, intuitive gift to the world.","You feel it all, deeply and profoundly connecting.","You are perfectly in sync with those around you.","A true heart-reader, an empath of rare ability.","Totally intuitive, a master of emotional understanding!"],
      control: ["Free, open, and letting things flow naturally.","A subtle claim, a gentle possessiveness, slips out.","You'll hold onto something (or someone) if they're sweet.","Half sharing and open, half 'this is mine, and precious'.","You're discovering you quite like being in control.","Control, for you, is a satisfying, grounding vibe.","You claim what's yours with pride and firm intention.","What is yours is yours, cherished and protected.","You are a devoted keeper, a guardian of what you value.","Total, unequivocal ownership and masterful control!"],
      creativity: ["Simple, straightforward, and practical is your way.","A brilliant spark of a new idea pops up!","You'll craft something unique if it's quick and fun.","Half plain and routine, half wild and imaginative.","You're sparking up, your creative energies flowing!","Creativity flows through you, a vibrant current!","You make magic, weaving wonders from sheer imagination!","Ideas are your joy, your playground, your art form!","You are a visionary star, a beacon of innovation!","A total creator, a master of imaginative worlds!"],
      precision: ["Loose, free, and wonderfully unconcerned with minutiae.","A bit of neatness and order is fine by you.","You'll focus on details if it's fast and essential.","Half sloppy and carefree, half sharp and focused.","You're getting more exact, enjoying the details.","Precision and meticulousness are your new thing!","You nail it all, every detail perfectly executed!","Every step is perfect, a testament to your care!","You are a detail whiz, a maestro of minutiae!","Total master of precision, a legend of exactitude!"],
      intensity: ["Soft, mellow, and radiating gentle calmness.","A tiny flare of intensity sneaks out unexpectedly.","You'll turn up the heat if you feel safe and inspired.","Half calm and composed, half fierce and passionate.","You're turning up the dial, embracing your power!","Intensity is your spark, your vibrant life force!","You bring the blaze, a controlled and potent fire!","Fierce, focused energy is your signature vibe!","You are a brilliant fire star, radiating power!","A total storm of captivating, raw intensity!"],
      sadism: ["Soft, sweet, and preferring only gentle interactions.","A playful tease, a hint of challenge, slips in.","You'll push a little, testing the waters of sensation.","Half gentle and kind, half wild and edgy.","You're testing the boundaries, exploring the thrill.","Pain, consensually given, is your intriguing play.","You love the delicious sting, the sharp focus it brings.","The thrill of controlled infliction is your game!","You are a spicy, exhilarating star of sensation!","A total master of the edge, an artist of intensity!"],
      leadership: ["Soft, shy, and preferring to support from behind.","A gentle nudge, a quiet suggestion, peeks out.","You'll guide if asked, or if no one else steps up.","Half gentle and suggestive, half firm and clear.","You're stepping up, finding your confident leader voice.","Leading others feels natural and empowering to you.","You steer with ease, clarity, and inspiring vision.","You are a bold, effective, and respected guide.","Full leader mode activated, and you wear it well!","A total captain, born to navigate and inspire!"],
      possession: ["Free, open, and believing in autonomy for all.","A subtle claim, a protective gesture, slips out.","You'll hold onto what's yours if it's precious and loved.","Half sharing and generous, half 'this is mine'.","You're discovering a liking for clear ownership.","Possession, for you, is a comforting, grounding vibe.","You claim what's yours with pride, devotion, and care.","What is yours is yours, cherished, protected, and guided.","You are a devoted keeper, a guardian of your treasures.","Total, unequivocal ownership, a mark of deep connection!"],
      patience: ["Fast, now, and preferring immediate results!","A moment of waiting, a brief pause, slips in.","You'll chill and wait if it's quick and clearly defined.","Half rushing and eager, half calm and composed.","You're cooling down, finding the virtue in waiting.","Patience is becoming your quiet, steady strength.","You wait with grace, composure, and understanding.","Calm, unwavering patience is your superpower.","You are a zen star, a beacon of tranquil waiting.","Total peace, the embodiment of perfect patience!"],
      dominanceDepth: ["Light, free, and preferring gentle influence.","A subtle hold, a hint of deeper control, peeks out.","You'll lead and direct if it's easy and welcomed.","Half soft and suggestive, half firm and authoritative.","You're taking charge, embracing your inner power.","Power, wielded responsibly, is your radiant glow.","You rule with ease, wisdom, and clear intention.","Total, profound control is the core of your being.","You are a rare gem of potent, ethical power.","A total ruler, a sovereign of your domain!"]
    };
    // Trait Explanations - FULLY POPULATED
    this.traitExplanations = {
      obedience: "This explores your inclination to follow instructions or yield to another's guidance. High scores suggest comfort with clear direction and rules, while low scores indicate a preference for autonomy or questioning directives.",rebellion: "This measures your tendency towards playful defiance or testing boundaries. High scores point to enjoying a spirited challenge and 'taming' dynamics, while low scores suggest a more compliant or direct approach to interaction.",service: "This assesses the fulfillment you derive from performing acts of service or dedicating yourself to another's needs. High scores indicate a strong desire to please and assist, while low scores suggest other forms of connection are more primary.",playfulness: "This gauges your love for lighthearted fun, games, and imaginative scenarios. High scores mean you thrive on silliness and creative play, while low scores point to a more serious or grounded interactive style.",sensuality: "This looks at your responsiveness to physical sensations like touch, texture, and atmosphere. High scores indicate a deep appreciation for rich sensory input, while low scores suggest a preference for less intense or more focused sensory experiences.",exploration: "This checks your eagerness to try new things, roles, or sensations. High scores mean you're adventurous and open to the unknown, while low scores suggest comfort with familiar routines and experiences.",devotion: "This measures the depth of loyalty and commitment you feel towards a partner or ideal. High scores indicate a capacity for profound, unwavering dedication, while low scores suggest a more independent or less intensely focused bond.",innocence: "This assesses your enjoyment of embodying a carefree, childlike, or pure persona. High scores point to a love for 'little space' or similar dynamics, while low scores suggest a preference for more mature or sophisticated roles.",mischief: "This gauges your affinity for playful troublemaking or cheeky pranks. High scores indicate a love for stirring things up lightheartedly, while low scores suggest a preference for calmer, more predictable interactions.",affection: "This explores your need for physical closeness, warmth, and expressed tenderness. High scores mean you crave cuddles and overt affection, while low scores suggest you're comfortable with more personal space or subtle expressions.",painTolerance: "This measures your interest in or capacity to experience and find meaning/pleasure in consensually given physical or psychological discomfort. High scores indicate an attraction to masochism or intense sensation play.",submissionDepth: "This assesses how completely you desire to surrender control to another. High scores point to a yearning for total power exchange, while low scores suggest a preference for lighter guidance or shared control.",dependence: "This gauges your comfort with relying on another for guidance, decisions, or care. High scores indicate a sense of security in dependence, while low scores suggest a strong preference for self-reliance.",vulnerability: "This measures how comfortable you are with emotional openness and exposing your inner self. High scores point to a natural ease with being vulnerable, while low scores indicate a more guarded emotional posture.",adaptability: "This checks your ability to switch between roles, moods, or styles of interaction. High scores indicate versatility (e.g., a Switch), while low scores suggest a preference for a consistent role.",tidiness: "This explores your enjoyment of maintaining order, cleanliness, and organization, potentially for another. High scores suggest a 'neat freak' or service-oriented tidiness, low scores a comfort with chaos.",politeness: "This assesses your natural inclination towards courteous, respectful, and mannered interactions. High scores indicate formality or deep respect is key, low scores a more casual or blunt style.",craving: "This measures your desire for intense, boundary-pushing, or extreme experiences. High scores point to a thrill-seeking nature, while low scores suggest a preference for gentler, more moderate sensations.",receptiveness: "This gauges your openness to truly receiving and internalizing direction, sensation, or energy from another. High scores indicate a strong 'bottoming' or receptive capacity, low scores a more self-directed approach.",authority: "This measures your natural inclination to take charge, make decisions, and lead. High scores indicate a strong Dominant tendency, while low scores suggest a preference for supporting or following roles.",confidence: "This assesses your self-assurance in your decisions, guidance, and ability to hold a dominant role. High scores point to unwavering conviction, while low scores might indicate hesitation or a softer approach.",discipline: "This explores your enjoyment of setting and enforcing rules, structure, and expectations. High scores indicate a 'Strict' or 'Disciplinarian' tendency, while low scores suggest a more relaxed, less rule-bound style.",boldness: "This gauges your fearlessness in facing challenges, trying new things, or taking initiative in a dominant capacity. High scores point to an 'Assertive' or 'Hunter' type, low scores a more cautious or gentle approach.",care: "This measures your instinct to nurture, protect, and support those under your guidance. High scores indicate a 'Nurturer,' 'Caretaker,' 'Daddy,' or 'Mommy' tendency, while low scores suggest a less overtly protective style.",empathy: "This assesses your ability to intuitively understand and connect with the emotional state of your partner. High scores are crucial for ethical dominance and roles like 'Nurturer,' while low scores might indicate a more objective or pragmatic approach.",control: "This explores your desire to direct, manage, and orchestrate aspects of a dynamic or your partner. High scores point to roles like 'Master,' 'Owner,' or 'Puppeteer,' while low scores suggest a preference for less micromanagement.",creativity: "This gauges your enjoyment in crafting unique scenarios, methods of interaction, or artistic expressions within a dynamic. High scores are typical for 'Riggers,' 'Puppeteers,' or imaginative Dominants.",precision: "This measures the importance you place on meticulous detail, flawless execution, and exacting standards. High scores are common in 'Riggers,' 'Strict' types, or 'Masters' with specific protocols.",intensity: "This assesses the focused, powerful energy you bring to interactions. High scores suggest a 'Sadist,' 'Hunter,' or 'Commander' who thrives on potent exchanges, while low scores indicate a softer, gentler presence.",sadism: "This explores your interest in the artful, consensual giving of physical or psychological pain/challenge. High scores point clearly to a Sadist archetype, recognizing the need for ethics and consent.",leadership: "This measures your natural ability to guide, inspire, and direct others towards a goal. It's a core trait for many Dominant roles, especially 'Master,' 'Commander,' or 'Sir.'",possession: "This gauges your sense of protective ownership or profound responsibility for a partner. High scores are typical for 'Owners,' 'Masters,' or 'Daddies/Mommies' who feel a deep bond of belonging.",patience: "This assesses your ability to remain calm, steadfast, and understanding while teaching, training, or awaiting compliance. Crucial for 'Trainers,' 'Nurturers,' and any Dominant working with a learning or testing partner.",dominanceDepth: "This explores your desire for a comprehensive and profound level of power within a dynamic. High scores point to roles like 'Master,' 'Goddess,' or those seeking total power exchange."
    };
    // Style Descriptions & Dynamic Matches - FULLY POPULATED
    this.styleDescriptions = {
       Brat: {
        title: "The Sparking Imp: Brat", icon: "😈",
        flavorText: "Rules are merely suggestions, darling. And I'm *awfully* good at creative reinterpretations.",
        essence: "The Brat is a whirlwind of playful defiance and mischievous charm. They thrive on testing boundaries, not to break them, but to engage in a spirited dance of wits and wills. It's a quest for attention, for the delicious friction of being 'tamed,' and for the underlying affection that makes the game worthwhile.",
        coreMotivations: ["To feel seen and engaged through playful challenge.", "To turn rules and expectations into a delightful game.", "To elicit a strong, focused (and often amused) reaction from their Dominant.", "To experience the thrill of 'being caught' and lovingly 'corrected'."],
        keyCharacteristics: ["Witty and quick-tongued.", "Loves to tease and provoke (playfully).", "Pushes boundaries with a twinkle in their eye.", "Energetic and often attention-seeking.", "Masters of loopholes and creative disobedience.", "Ultimately craves connection and reassurance beneath the mischief."],
        strengthsInDynamic: ["Injects immense fun, energy, and unpredictability.", "Keeps Dominants on their toes and encourages creative responses.", "Can lead to strong communication as true limits are navigated amidst play.", "Builds a unique bond based on shared humor and understanding."],
        potentialChallenges: ["Playful defiance can be misread as genuine disrespect if not carefully calibrated.", "Risk of frustrating a partner who isn't in the mood for games or lacks patience.", "Requires clear communication of 'hard limits' versus 'playful resistance'.", "Can sometimes escalate beyond intended playfulness without clear signals from both sides."],
        thrivesWith: ["A Dominant who possesses patience, a robust sense of humor, and enjoys intellectual sparring.", "Clear boundaries and consistent (but loving and often playful) consequences.", "Partners who appreciate the art of the 'chase' and the affection beneath the mischief.", "Dynamics where their wit and energy are seen as strengths rather than annoyances."],
        pathwaysToExploration: ["Clearly define 'safe words' and 'soft/hard limits' before engaging in bratty play.", "Experiment with different levels of bratting – from subtle teasing to outright (playful) rebellion.", "Discuss with your partner what 'taming' or 'correction' feels rewarding and fun for both of you.", "Explore 'funishments' that are more about shared amusement or connection than genuine punishment."]
      },
      Little: {
        title: "The Cherished Heart: Little", icon: "🍼",
        flavorText: "In a world of big worries, I find my joy in small wonders and gentle hands.",
        essence: "The Little embodies innocence, playfulness, and a desire for nurturing care. They find comfort in stepping away from adult responsibilities, embracing a more carefree and dependent state. This style is about trust, vulnerability, and the joy of being cherished, guided, and allowed to explore a simpler, often imaginative, world.",
        coreMotivations: ["To experience a sense of safety, comfort, and being unconditionally cared for.", "To explore playfulness, creativity, and imagination without adult inhibitions.", "To escape the pressures of adulthood and reconnect with a simpler, more joyful state of being.", "To build a deep, trusting bond with a caregiver figure who appreciates their unique needs."],
        keyCharacteristics: ["Innocent, curious, and often highly playful or imaginative.", "Seeks affection, reassurance, guidance, and gentle rules.", "May engage in age-regressive behaviors (e.g., using a 'little' voice, enjoying toys, specific foods, or simple comforts).", "Values emotional connection and trust profoundly.", "Can be shy initially but highly expressive once comfortable and secure."],
        strengthsInDynamic: ["Brings a sense of warmth, joy, and lightheartedness to the dynamic.", "Fosters deep emotional intimacy, trust, and a unique form of bonding.", "Allows the caregiver partner to express nurturing, protective, and guiding instincts.", "Can be a source of stress relief, healing, and shared delight for both partners."],
        potentialChallenges: ["Requires a caregiver who is genuinely nurturing, patient, understanding, and ethical.", "Boundaries around 'little space' and 'adult space' need clear, ongoing communication.", "Vulnerability is inherently high, making unwavering trust and respect paramount.", "Ensuring the dynamic remains consensual and doesn't exploit perceived innocence or power imbalances."],
        thrivesWith: ["A patient, empathetic, and protective Caretaker, Daddy, or Mommy figure who genuinely enjoys the role.", "Clear communication about needs, boundaries, comfort levels, and desired activities in 'little space'.", "An environment that feels safe, secure, and encouraging of their innocent exploration and self-expression.", "Partners who understand that 'little space' is a valid and important part of their identity."],
        pathwaysToExploration: ["Create a 'little space' kit with comforting items (e.g., favorite blanket, stuffie, coloring books, simple games, snacks).", "Discuss desired age range (if any) and preferred activities with your caregiver.", "Explore different forms of affection, praise, and reassurance that feel good and affirming.", "Practice transitioning in and out of 'little space' in a way that feels comfortable, safe, and respected by both partners."]
      },
      'Rope Bunny': {
        title: "The Woven Form: Rope Bunny", icon: "🪢",
        flavorText: "In threads of trust, my body becomes art, my spirit finds its stillness, my sensations ignite.",
        essence: "The Rope Bunny finds profound beauty, sensation, and surrender in the art of shibari or rope bondage. It's not just about restraint, but about the intimate dance between Rigger and model, the aesthetic lines, the pressure, the trust, and the unique mental and physical space it creates. This style is a blend of vulnerability, endurance, trust, and often, a deep appreciation for the craft and the connection.",
        coreMotivations: ["To experience the unique physical sensations (pressure, restriction, suspension) and mental state (focus, trance, surrender) induced by rope.", "To surrender control and trust completely in their Rigger's skill and care.", "To appreciate the aesthetic beauty and artistry of rope work, becoming living sculpture.", "To explore limits of endurance, sensation, and vulnerability in a controlled, consensual, and often intense way."],
        keyCharacteristics: ["High trust in their Rigger's abilities and intentions.", "Appreciation for the aesthetics, feel, and symbolism of rope.", "Often patient, able to hold poses, and endure varying levels of discomfort for the art/experience.", "Communicative about comfort, safety, sensations, and limits (before, during, and after).", "May enjoy feelings of helplessness, objectification (consensual), or the intense focus it brings."],
        strengthsInDynamic: ["Facilitates a deep, often non-verbal, connection and trust with the Rigger.", "Allows for creative and artistic expression through the body, transforming it into art.", "Can lead to intense meditative, euphoric, or 'subspace' states.", "Builds immense trust and requires meticulous communication for safety and satisfaction."],
        potentialChallenges: ["Requires a skilled, knowledgeable, and safety-conscious Rigger to avoid injury.", "Risk of nerve compression, circulation issues, or joint strain if not done correctly or if limits are pushed unsafely.", "Emotional vulnerability can be intense; comprehensive aftercare is crucial.", "Physical limitations, pain tolerance, or pre-existing conditions must be respected."],
        thrivesWith: ["A skilled, patient, and safety-focused Rigger who listens to their body and communicates clearly.", "Open and continuous communication channels before, during, and after a tie.", "An appreciation for the process, the sensations, and the connection, not just the visual end result.", "Riggers who prioritize consent, ongoing comfort checks, risk awareness, and thorough aftercare."],
        pathwaysToExploration: ["Start with simple, foundational ties and gradually explore more complex or constrictive ones.", "Learn basic rope safety, anatomy (nerve paths, pressure points), and emergency release techniques (even as the one being tied).", "Communicate constantly with your Rigger about how things feel – pressure, tingling, numbness, pain.", "Explore different types of rope (jute, hemp, nylon, cotton) and their textures/sensations, as well as different tying styles."]
      },
      Masochist: {
        title: "The Ecstatic Receiver: Masochist", icon: "💥",
        flavorText: "Through the fire of sensation, I find my clarity, my release, my profoundest joy.",
        essence: "The Masochist discovers pleasure, release, or a unique state of consciousness through consensually received pain or intense sensation. This isn't about self-harm, but a complex interplay of psychology, physiology, and trust. For the Masochist, pain can be a pathway to euphoria, deep submission, emotional catharsis, or a heightened sense of being alive.",
        coreMotivations: ["To transform pain into pleasure, release, or altered states of consciousness.", "To test personal limits of endurance and mental fortitude within a safe context.", "To experience a profound sense of surrender and trust with their Sadist/Dominant.", "To achieve emotional catharsis or a heightened sense of physical awareness and being present."],
        keyCharacteristics: ["Finds pleasure or other desired states through consensually received pain/intense sensation.", "Often has a high pain tolerance or a specific appreciation for certain types of pain.", "Values trust and clear communication with their Sadist/Dominant immensely.", "May enjoy the psychological aspects of enduring or 'earning' their sensations.", "Requires and appreciates thorough aftercare."],
        strengthsInDynamic: ["Enables intense and deeply connected scenes with a Sadist.", "Can achieve profound states of 'subspace' or euphoria.", "Offers a unique avenue for exploring trust, vulnerability, and resilience.", "Often highly attuned to their own body and limits (when practicing safely)."],
        potentialChallenges: ["Risk of physical injury if safety protocols, limits, or safe words are ignored.", "Emotional overwhelm or 'subdrop' can be significant; aftercare is non-negotiable.", "Finding a skilled, ethical, and attuned Sadist who understands their specific needs and limits.", "Potential for misinterpretation or judgment from those unfamiliar with consensual masochism."],
        thrivesWith: ["A skilled, empathetic, and ethical Sadist who prioritizes their well-being and respects limits.", "Clear and unambiguous safe words and communication signals.", "Thorough negotiation of types of pain, intensity levels, and hard limits before scenes.", "Comprehensive and compassionate aftercare tailored to their needs (physical and emotional)."],
        pathwaysToExploration: ["Start with milder sensations and gradually explore different types and intensities of pain (e.g., impact, pressure, temperature, psychological).", "Clearly define what constitutes 'good pain' versus 'bad pain' or signals of a real problem.", "Learn about different types of BDSM implements and their effects.", "Develop a detailed aftercare plan with your partner, including comfort items, hydration, emotional support, etc."]
      },
      Pet: {
        title: "The Cherished Companion: Pet", icon: "🐾",
        flavorText: "A wagging tail, a happy purr, a loyal heart – my joy is in your smile and gentle hand.",
        essence: "The Pet embodies characteristics of a beloved animal companion, finding joy in playfulness, affection, simple rules, and the care of an Owner or Handler. This style can range from purely playful and innocent to more primal or trained, but always centers on a bond of affection, loyalty, and often, a charmingly dependent form of submission.",
        coreMotivations: ["To experience unconditional affection, care, and a sense of belonging.", "To engage in playful, often non-verbal, interaction and explore animalistic personas.", "To find comfort in simpler rules, routines, and the guidance of a loving Owner.", "To express loyalty and devotion in a unique and often disarming way."],
        keyCharacteristics: ["Playful, affectionate, and often eager to please.", "May adopt specific animal mannerisms (e.g., purring, nuzzling, barking, tail-wagging).", "Responds well to praise, treats (symbolic or real), and clear, simple commands.", "Values a strong bond with their Owner/Handler, often showing deep loyalty.", "Comfortable with (or enjoys) pet-like accessories (collars, leashes for walks, bowls)."],
        strengthsInDynamic: ["Brings immense joy, lightheartedness, and a unique form of affection to a dynamic.", "Fosters a strong, often deeply comforting, bond between Pet and Owner.", "Allows for creative and imaginative play scenarios.", "Can be a wonderful way to de-stress and tap into simpler pleasures."],
        potentialChallenges: ["Requires an Owner who genuinely enjoys and respects pet play, avoiding degradation unless explicitly consensual.", "Communication can be non-verbal, requiring attentiveness from the Owner.", "Maintaining the 'Pet' persona consistently can be demanding for some.", "Ensuring the dynamic doesn't infantilize in unintended ways if that's not desired."],
        thrivesWith: ["A loving, patient, and attentive Owner or Handler who enjoys the specific type of pet play desired.", "Clear rules, routines, and consistent positive reinforcement (praise, affection).", "An environment that allows for safe and comfortable expression of their Pet persona.", "Owners who understand the balance of care, discipline (if part of the play), and affection."],
        pathwaysToExploration: ["Choose a specific animal persona (puppy, kitten, pony, fox, etc.) or remain a more general 'pet'.", "Acquire 'gear' that enhances the persona (e.g., ears, tail, collar, specific toys).", "Practice animalistic movements, sounds, and behaviors in a playful way.", "Discuss with your Owner desired forms of 'training,' 'rewards,' and 'care routines'."]
      },
      Slave: {
        title: "The Devoted Hand: Slave", icon: "🔗",
        flavorText: "My purpose is found in your will, my freedom in your command, my heart in your keeping.",
        essence: "The Slave archetype embodies profound devotion, service, and a deep commitment to a Master or Mistress. This is often a highly structured, all-encompassing dynamic built on immense trust, clear protocols, and a complete surrender of autonomy. For the Slave, fulfillment comes from dedicated service, obedience, and living for the betterment or pleasure of their Dominant.",
        coreMotivations: ["To achieve profound fulfillment through selfless service and total devotion.", "To experience a deep sense of purpose and belonging within a structured power dynamic.", "To surrender the burdens of self-direction and find peace in obedience.", "To build an unbreakable bond of trust and loyalty with their Master/Mistress."],
        keyCharacteristics: ["Unwavering loyalty, obedience, and dedication.", "Finds satisfaction in performing tasks and duties meticulously.", "Often adheres to strict protocols and forms of address.", "High level of trust and commitment to their Dominant.", "May embrace symbols of their status (e.g., collars, uniforms, specific living conditions)."],
        strengthsInDynamic: ["Provides their Dominant with unparalleled support, dedication, and operational efficiency.", "Fosters an incredibly deep and unique bond based on total power exchange.", "Can achieve a profound sense of peace and purpose through their role.", "Often highly disciplined and focused on their duties."],
        potentialChallenges: ["Requires an exceptionally ethical, responsible, and communicative Dominant.", "The intensity of the power imbalance necessitates constant vigilance against exploitation.", "Loss of self can be a risk if the dynamic isn't balanced with care for the Slave's well-being.", "Finding a truly compatible partner willing and able to ethically hold such power."],
        thrivesWith: ["A Master or Mistress who is deeply ethical, communicative, responsible, and worthy of such devotion.", "Meticulously negotiated contracts, protocols, and limits that prioritize the Slave's well-being.", "Regular check-ins and open communication channels, even within the power imbalance.", "A Dominant who values their Slave's dedication and provides for their needs (emotional, physical, mental)."],
        pathwaysToExploration: ["Engage in extensive discussions and negotiations to create a 'slave contract' or detailed set of protocols.", "Explore different forms of service (personal, domestic, specialized tasks).", "Practice formal protocols, forms of address, and rituals that reinforce the dynamic.", "Continuously evaluate personal well-being and ensure the dynamic remains healthy and consensual at its core."]
      },
      Submissive: {
        title: "The Yielding Heart: Submissive", icon: "🙇",
        flavorText: "In your guidance, I find my peace; in your strength, my surrender finds its grace.",
        essence: "The Submissive finds joy, peace, and fulfillment in yielding to the guidance, authority, and care of a Dominant. This role is about embracing vulnerability, trusting another's lead, and finding strength in letting go. Submission can range from playful and scene-based to a deeper, more integrated part of a relationship, always centered on consensual power exchange.",
        coreMotivations: ["To experience relief from the burden of decision-making and find peace in following.", "To explore vulnerability and trust in a safe and consensual manner.", "To please a chosen Dominant and find satisfaction in their approval.", "To connect deeply with a partner through the intimacy of power exchange."],
        keyCharacteristics: ["Enjoys following rules and directions from a trusted Dominant.", "Values trust, communication, and clear boundaries.", "Finds comfort or excitement in relinquishing control.", "Often eager to please and responsive to their Dominant's desires.", "Can be highly attuned to their Dominant's moods and needs."],
        strengthsInDynamic: ["Allows the Dominant to fully express their leadership and guiding qualities.", "Fosters deep trust, intimacy, and communication.", "Can bring a sense of balance and harmony to a power exchange dynamic.", "Often highly intuitive and responsive to their partner."],
        potentialChallenges: ["Requires a Dominant who is ethical, communicative, and respectful of limits.", "Vulnerability needs to be protected; trust can be easily broken.", "Clearly defining desired level of submission and boundaries is crucial.", "Potential for 'sub-frenzy' (over-eagerness) or 'sub-drop' (emotional crash post-scene) needs management."],
        thrivesWith: ["A Dominant who is clear, consistent, caring, and respects their limits and desires.", "Open and honest communication about needs, boundaries, and expectations.", "A dynamic where their submission is valued and cherished, not taken for granted.", "Partners who understand the importance of aftercare and emotional support."],
        pathwaysToExploration: ["Start by defining clear limits and safe words with your Dominant.", "Explore different levels of submission – from simple commands in a scene to more structured protocols.", "Communicate what types of instructions, praise, or correction feel good and affirming.", "Practice mindfulness to stay aware of your own feelings and boundaries during submission."]
      },
      Switch: {
        title: "The Shifting Current: Switch", icon: "🔄",
        flavorText: "Why choose one current when I can dance in the ebb and flow of all tides, mastering and yielding in turn?",
        essence: "The Switch embodies versatility and a love for exploring both Dominant and submissive roles. They are not confined to one side of the slash, finding joy, power, and release in the fluidity of exchanging control. This style is about empathy, adaptability, and understanding the full spectrum of a dynamic, often bringing a unique depth of understanding to each role they inhabit.",
        coreMotivations: ["To experience and understand both sides of a power dynamic fully.", "To avoid the limitations or perceived monotony of a single role.", "To connect with partners on multiple levels of control, surrender, guidance, and receptivity.", "To enjoy the spontaneity, creativity, and challenge that comes with role flexibility."],
        keyCharacteristics: ["Adaptable, flexible, and often highly empathetic.", "Capable of embodying both dominant and submissive traits effectively.", "Communicative about current desires and role preferences (crucial for clarity).", "May enjoy the 'surprise' element of switching or negotiating roles per scene/mood.", "Can be equally confident and assertive as a Dominant, or vulnerable and receptive as a submissive."],
        strengthsInDynamic: ["Brings immense variety, keeping the dynamic fresh, exciting, and unpredictable (in a good way).", "Deepens understanding, empathy, and communication between partners.", "Allows both partners to explore different facets of their desires and capabilities.", "Can be highly responsive to a partner's mood or needs, adapting their role accordingly."],
        potentialChallenges: ["Requires exceptional communication about who is in which role at any given time to avoid confusion or unmet expectations.", "Can sometimes lead to 'topping from the bottom' or 'bottoming from the top' if signals are mixed or unspoken.", "Finding partners who are also comfortable with, enjoy, or are skilled at switching.", "Ensuring smooth, consensual, and clearly signaled transitions between roles."],
        thrivesWith: ["Other Switches, or partners who are open to exploring different roles and are good communicators.", "Excellent communication skills, clear signals, and explicit negotiation for role changes or preferences.", "A mutual desire for exploration, flexibility, and a deep understanding of power dynamics.", "Partners who appreciate the nuanced understanding, empathy, and versatility a Switch brings to the table."],
        pathwaysToExploration: ["Develop clear verbal or non-verbal signals/rituals for initiating a switch in roles.", "Discuss preferences for specific dominant and submissive activities with your partner(s) for when you're in each role.", "Explore scenarios or scenes that specifically involve a deliberate shift in power mid-scene.", "Keep a journal to reflect on experiences in both roles, noting what you enjoy, learn, and desire from each perspective."]
      },
      Puppy: {
        title: "The Loyal Playmate: Puppy", icon: "🐶",
        flavorText: "A happy bark, a playful bound, my world revolves around your kind command and joyful games!",
        essence: "The Puppy embodies boundless enthusiasm, loyalty, and a love for playful interaction, mirroring the endearing qualities of a canine companion. They thrive on praise, affection, clear guidance (training), and the joy of pleasing their Owner or Trainer. This style is often energetic, eager, and deeply affectionate, seeking a structured yet loving environment.",
        coreMotivations: ["To express boundless joy, energy, and affection in a playful, animalistic way.", "To experience a loyal, devoted bond with an Owner/Trainer.", "To find comfort and fun in clear rules, 'training,' and positive reinforcement.", "To engage in energetic play and receive copious amounts of praise and cuddles."],
        keyCharacteristics: ["Energetic, enthusiastic, and eager to please.", "Often very playful, enjoying games like fetch, tug-of-war, or learning 'tricks'.", "Responds well to praise, petting, and clear, consistent commands.", "Shows deep loyalty and affection towards their Owner/Trainer.", "May enjoy puppy-like gear (collar, leash, ears, tail) and behaviors (barking, whimpering, nuzzling)."],
        strengthsInDynamic: ["Injects a huge amount of fun, energy, and unconditional affection into the dynamic.", "Fosters a strong, loving bond based on loyalty and mutual enjoyment.", "Responds very well to structured 'training' and positive reinforcement techniques.", "Can be incredibly endearing and bring out a playful, nurturing side in their Owner/Trainer."],
        potentialChallenges: ["High energy levels may require an Owner who can match or channel it effectively.", "Clear and consistent 'training' or rule-setting is often needed to avoid chaotic behavior.", "Non-verbal cues can be important, requiring an attentive Owner.", "Ensuring the play remains respectful and doesn't become demeaning unless that's a specifically negotiated aspect."],
        thrivesWith: ["An Owner or Trainer who is patient, energetic, enjoys playful interaction, and is skilled in positive reinforcement.", "Clear, consistent rules and 'training' methods.", "Plenty of praise, affection, and opportunities for play.", "An environment where their puppyish enthusiasm is cherished and guided, not stifled."],
        pathwaysToExploration: ["Develop a specific 'puppy persona' – what breed or type of puppy are you?", "Acquire gear: a comfortable collar, a leash for 'walkies,' puppy ears/tail, favorite toys.", "Practice puppy behaviors: happy barks/yips, whimpers, nuzzling, tail wags (real or imagined!).", "Work with your Owner/Trainer on 'tricks,' commands, and reward systems (praise, treats, playtime)."]
      },
      Kitten: {
        title: "The Sensual Tease: Kitten", icon: "🐱",
        flavorText: "A soft purr, a playful swat, I dance between cuddly comfort and mischievous curiosity.",
        essence: "The Kitten blends sensuality, independence, and a touch of playful mischief, much like a feline. They enjoy affection on their own terms, luxurious comfort, and the thrill of a gentle hunt or playful pounce. This style is often graceful, a little aloof at times, but ultimately seeks warmth, care, and engaging interaction from their Owner.",
        coreMotivations: ["To explore a sensual, graceful, and sometimes mysterious persona.", "To receive affection and care, often on their own terms, balanced with independence.", "To engage in playful 'hunting' or teasing behavior.", "To enjoy comfort, pampering, and the attention of a doting Owner."],
        keyCharacteristics: ["Graceful, sensual, and can be both affectionate and independent.", "Enjoys comfort, warmth, and perhaps a bit of pampering.", "Playful in a stalking, pouncing, or batting way; may enjoy teasing.", "Communicates with purrs, meows, hisses (playful), and body language (rubbing, kneading).", "Values an Owner who understands their need for both attention and occasional solitude."],
        strengthsInDynamic: ["Brings a unique blend of sensuality, playful unpredictability, and affectionate moments.", "Can be very calming and comforting (the purring effect!).", "Encourages a dynamic of patient pursuit and rewarding interaction from the Owner.", "Often very attuned to their environment and their Owner's moods."],
        potentialChallenges: ["'On their own terms' affection can be frustrating for Owners seeking constant cuddles.", "Mischievousness needs to be channeled constructively.", "Interpreting subtle feline cues requires an attentive Owner.", "May need periods of 'alone time' or less intense interaction."],
        thrivesWith: ["A patient, observant Owner who appreciates feline nature – the independence mixed with sudden affection.", "An environment with comfortable spots for 'napping' and interesting things to 'explore' or 'bat at'.", "Gentle handling, warm affection, and engaging (but not overwhelming) play.", "Owners who enjoy the subtle dance of a kitten's affections and moods."],
        pathwaysToExploration: ["Cultivate your 'kitten persona': are you a slinky Siamese, a fluffy Persian, a playful tabby?", "Incorporate kittenish gear: ears, tail, a collar with a bell, soft blankets.", "Practice kitten behaviors: purring, meowing, rubbing against legs, playful pounces, 'kneading' with hands.", "Explore 'hunting' games with your Owner (e.g., chasing a laser pointer or feather toy)."]
      },
      Princess: {
        title: "The Adored Jewel: Princess", icon: "👑",
        flavorText: "To be cherished, pampered, and adored – is that too much for a Princess to ask?",
        essence: "The Princess revels in being the center of attention, deserving of pampering, adoration, and gentle, indulgent care. This style blends a sense of entitled innocence with a desire for luxurious comfort and unwavering affection. They expect their needs to be anticipated and met with grace, enjoying a regal yet dependent role.",
        coreMotivations: ["To feel exceptionally special, cherished, and adored.", "To be pampered and have their desires catered to with enthusiasm.", "To enjoy a luxurious, comfortable, and aesthetically pleasing environment.", "To embody a sense of regal grace and charming entitlement."],
        keyCharacteristics: ["Expects and enjoys being pampered, spoiled, and treated as royalty.", "Values beauty, comfort, and luxurious things.", "Can be demanding but often in a charming or innocent way.", "Seeks constant affection, admiration, and reassurance.", "May enjoy being dressed up or adorned."],
        strengthsInDynamic: ["Inspires doting behavior and allows a partner to express lavish affection.", "Can bring a sense of glamour, fun, and lighthearted indulgence to a dynamic.", "Often very appreciative of genuine efforts to please them.", "Clearly communicates desires (even if high-maintenance)."],
        potentialChallenges: ["Can be perceived as overly demanding or high-maintenance if not balanced with appreciation.", "Requires a partner willing and able to provide consistent adoration and pampering.", "Entitlement can become uncharming if not tempered with sweetness or playfulness.", "Maintaining the 'Princess' lifestyle can be resource-intensive (time, effort, finances)."],
        thrivesWith: ["A doting Daddy, indulgent Master/Mistress, or devoted Caretaker who genuinely enjoys pampering and adoring them.", "Clear communication of desires and expectations (and appreciation for fulfillment).", "An environment that caters to their comfort and aesthetic preferences.", "Partners who find joy in spoiling and cherishing their 'Princess'."],
        pathwaysToExploration: ["Create a 'Princess boudoir' or special comfort zone.", "Make a list of 'royal decrees' (desired pampering activities) for your partner.", "Explore elegant attire, jewelry, or accessories that make you feel regal.", "Practice expressing your desires with charm and grace, and showing appreciation lavishly."]
      },
      Prey: {
        title: "The Thrill Chaser: Prey", icon: "🏃",
        flavorText: "The chase quickens my pulse, the shadow of capture ignites my spirit – in delicious fear, I find my life.",
        essence: "The Prey thrives on the exhilarating dynamic of pursuit and (consensual) capture. This style is about the adrenaline rush of being hunted, the delicious tension of potential capture, and the ultimate surrender to a skilled Hunter. It's a primal dance of fear, excitement, and trust in the Hunter's control and ethical boundaries.",
        coreMotivations: ["To experience the thrill and adrenaline of being pursued and 'hunted'.", "To explore themes of vulnerability and helplessness within a safe, consensual framework.", "To engage in a primal, instinctual game of cat-and-mouse.", "To surrender to a 'Hunter' figure they trust to make the chase exciting and the capture satisfying."],
        keyCharacteristics: ["Enjoys the psychological and physical sensations of being chased.", "May exhibit fear responses (real or played) that heighten the experience.", "Values a Hunter who is skilled at building suspense and creating a thrilling chase.", "Trusts their Hunter to ensure safety and respect boundaries even in intense scenarios.", "Finds release or excitement in the moment of 'capture'."],
        strengthsInDynamic: ["Provides an intensely thrilling and primal experience for both Prey and Hunter.", "Allows for exploration of deep-seated instincts and power dynamics.", "Can be highly cathartic and energizing.", "Requires strong trust and non-verbal communication skills."],
        potentialChallenges: ["Requires a Hunter who is highly attuned to safety, consent, and the Prey's actual limits (not just played fear).", "Risk of scenes becoming too intense or genuinely frightening if not managed carefully.", "Clear safe words and de-escalation signals are absolutely critical.", "Aftercare is essential to process the adrenaline and intense emotions."],
        thrivesWith: ["A skilled, ethical Hunter who excels at creating suspense and managing intensity safely.", "Clearly defined boundaries, safe words, and signals for the 'chase' and 'capture'.", "An environment that allows for movement and elements of hide-and-seek or pursuit.", "Hunters who understand that the 'fear' is part of the play and ensure genuine safety throughout."],
        pathwaysToExploration: ["Discuss preferred 'hunting grounds' (e.g., a dark room, outdoors if safe and private, online text-based).", "Establish clear signals for 'too much' that are distinct from playful fear.", "Explore different scenarios: escape and evasion, being cornered, an ambush.", "Negotiate what happens upon 'capture' – restraint, interrogation, further play?"]
      },
      Toy: {
        title: "The Eager Instrument: Toy", icon: "🎲",
        flavorText: "Shape me, use me, play with me – my delight is in becoming whatever you desire.",
        essence: "The Toy finds joy in being an object of pleasure and amusement for their Dominant or Owner. This style is characterized by adaptability, a willingness to be used or manipulated (consensually), and often a playful or eager-to-please demeanor. They enjoy fulfilling their partner's creative desires and being the focus of their playful or sensual attention.",
        coreMotivations: ["To provide pleasure and amusement to their Dominant/Owner.", "To be adaptable and responsive to their partner's desires and instructions.", "To enjoy the feeling of being 'used' or 'played with' in a consensual, often objectifying way.", "To be the center of their partner's creative or sensual focus."],
        keyCharacteristics: ["Highly adaptable and eager to please.", "Enjoys being directed, posed, or used in various scenarios.", "Often playful and responsive to their partner's creative ideas.", "May enjoy objectification or being treated as a prized possession.", "Values clear instructions and feedback from their Dominant/Owner."],
        strengthsInDynamic: ["Offers immense creative freedom and satisfaction for a Dominant/Owner.", "Can adapt to a wide variety of scenes and scenarios.", "Brings a playful, enthusiastic energy to interactions.", "Often very good at taking direction and fulfilling a partner's vision."],
        potentialChallenges: ["Requires a Dominant/Owner who is creative, respectful, and doesn't take their willingness for granted.", "Clear communication of limits is essential, as the Toy may be very eager to please.", "Risk of feeling depersonalized if the 'object' aspect isn't balanced with care and appreciation.", "Ensuring the 'play' remains fun and consensual for the Toy, not just the partner."],
        thrivesWith: ["A creative, playful, and respectful Dominant or Owner who has interesting ideas for 'playtime'.", "Clear communication about desires, limits, and what kind of 'play' is enjoyable.", "Regular check-ins to ensure the Toy feels valued and their boundaries are respected.", "Partners who appreciate their adaptability and enthusiasm for fulfilling roles."],
        pathwaysToExploration: ["Discuss with your partner what kind of 'Toy' you'd like to be (e.g., a doll, a sex toy, a specific character).", "Explore different scenarios where you are 'used' for your partner's pleasure or amusement.", "Incorporate costumes, props, or specific instructions to enhance the role.", "Practice being highly responsive to commands and adaptable to changing desires."]
      },
      Doll: {
        title: "The Perfected Form: Doll", icon: "🎎",
        flavorText: "Molded by your hands, adorned by your vision, I am still and perfect, awaiting your touch.",
        essence: "The Doll finds fulfillment in embodying a state of perfection, stillness, and aesthetic beauty, often being posed, dressed, and admired by a Puppeteer or Owner. This style emphasizes visual presentation, passivity, and the art of being an exquisite object of another's creative vision. It requires patience, control over one's own movements (or lack thereof), and a deep trust in the one who 'animates' them.",
        coreMotivations: ["To achieve a state of aesthetic perfection and be admired as a beautiful object.", "To surrender control over movement and presentation to another.", "To enjoy the sensation of being posed, dressed, and meticulously arranged.", "To fulfill a partner's artistic or creative vision through their own form."],
        keyCharacteristics: ["Values stillness, grace, and aesthetic presentation.", "Enjoys being dressed, made-up, and posed by their Puppeteer/Owner.", "Often has high patience and ability to remain still for extended periods.", "May enjoy the feeling of objectification or being a 'living canvas'.", "Communicates subtly or relies on the Puppeteer to interpret their needs while 'inanimate'."],
        strengthsInDynamic: ["Offers a unique canvas for a Puppeteer's creativity and aesthetic desires.", "Can create visually stunning and deeply symbolic scenes.", "Fosters a unique form of trust and non-verbal communication.", "Allows for exploration of themes of objectification, perfection, and control in an artistic way."],
        potentialChallenges: ["Physical discomfort from holding poses or restrictive clothing/makeup.", "Requires a Puppeteer who is patient, gentle, and highly attuned to the Doll's well-being.", "Communication of needs or distress can be difficult when embodying stillness.", "Maintaining the 'perfect' image can be psychologically demanding."],
        thrivesWith: ["A creative, patient, and detail-oriented Puppeteer or Owner with a strong aesthetic vision.", "Clear communication about comfort, duration of poses, and any physical limitations beforehand.", "An environment that enhances the aesthetic (e.g., lighting, props, backdrop).", "Partners who appreciate the artistry and dedication involved in being a 'living Doll'."] ,
        pathwaysToExploration: ["Experiment with different 'Doll' aesthetics (e.g., porcelain, ball-jointed, mannequin, specific character).", "Practice holding poses and maintaining stillness for increasing durations.", "Allow your partner to dress you, apply makeup, and arrange you as they desire.", "Develop subtle cues for communication if you need to break a pose or express discomfort."]
      },
      Bunny: {
        title: "The Gentle Spirit: Bunny", icon: "🐰",
        flavorText: "A soft twitch of the nose, a gentle hop, my heart is timid yet full of sweet affection.",
        essence: "The Bunny embodies gentleness, timidity, and a sweet, often innocent, playfulness. They are typically affectionate but may be shy or easily startled, requiring a soft approach and a safe, comforting environment. Bunnies enjoy quiet affection, gentle games, and the security of a kind Caretaker or Owner.",
        coreMotivations: ["To experience gentle affection, comfort, and a sense of safety.", "To embody a soft, timid, and endearing persona.", "To engage in quiet, playful interactions within a secure dynamic.", "To build a trusting bond with a patient and gentle partner."],
        keyCharacteristics: ["Gentle, timid, and often shy or easily startled.", "Values quiet affection, soft touches, and a calm environment.", "May enjoy 'nesting' or creating a cozy, safe space.", "Playfulness is often subtle and sweet rather than boisterous.", "Responds well to patience, reassurance, and a gentle approach."],
        strengthsInDynamic: ["Brings a sense of sweetness, innocence, and gentle affection to a dynamic.", "Elicits protective and nurturing instincts in a partner.", "Fosters a very tender and trusting bond.", "Can be very calming and soothing to be around."],
        potentialChallenges: ["Timidity can sometimes be misinterpreted or require extra patience from a partner.", "Requires a very gentle and reassuring approach to avoid causing distress.", "May not thrive in loud, chaotic, or overly intense dynamics.", "Communication of needs might be very subtle."],
        thrivesWith: ["A patient, gentle, and reassuring Caretaker or Owner who appreciates their soft nature.", "A calm, quiet, and secure environment where they feel safe to explore.", "Lots of gentle affection, soft words, and understanding for their timidity.", "Partners who find joy in nurturing a delicate and sweet spirit."],
        pathwaysToExploration: ["Create a cozy 'bunny burrow' or safe nesting spot with soft blankets and pillows.", "Incorporate 'bunny' gear like soft ears, a fluffy tail, or comfortable, soft clothing.", "Practice timid but curious bunny-like behaviors (e.g., nose twitches, gentle hops, cautious exploration).", "Engage in quiet, gentle play with your partner, like sharing a 'carrot' (snack) or enjoying soft pets."]
      },
      Servant: {
        title: "The Dutiful Attendant: Servant", icon: "🧹",
        flavorText: "In diligent service and quiet obedience, I find my honor and my purpose.",
        essence: "The Servant finds profound satisfaction and purpose in dutifully attending to the needs and desires of their Master or Mistress. This style emphasizes meticulousness, politeness, and a quiet, respectful execution of tasks. Unlike the all-encompassing devotion of a Slave, a Servant's role may be more defined by specific duties or a formal code of conduct, always performed with honor and dedication.",
        coreMotivations: ["To find honor and satisfaction in performing tasks and duties flawlessly.", "To provide exceptional, respectful service to a valued Master/Mistress.", "To operate within a clear framework of rules, protocols, and expectations.", "To demonstrate loyalty and respect through diligent and anticipatory service."],
        keyCharacteristics: ["Meticulous, attentive to detail, and highly organized.", "Polite, respectful, and often adheres to formal protocols or etiquette.", "Takes pride in anticipating needs and executing tasks efficiently.", "Values clear instructions and feedback on their performance.", "Finds fulfillment in a well-ordered environment and the satisfaction of their Master/Mistress."],
        strengthsInDynamic: ["Brings order, efficiency, and a sense of refined care to a household or dynamic.", "Allows a Master/Mistress to focus on other things, knowing tasks are handled impeccably.", "Fosters a dynamic of respect, appreciation, and clear role definition.", "Often very reliable and dedicated to their duties."],
        potentialChallenges: ["Requires a Master/Mistress who clearly defines duties and provides constructive feedback, not just criticism.", "Can sometimes focus too much on tasks and less on emotional connection if not balanced.", "Risk of burnout if duties are overwhelming or unappreciated.", "Maintaining motivation if service feels like drudgery rather than honored work."],
        thrivesWith: ["A Master or Mistress who appreciates meticulous service, provides clear direction, and acknowledges effort.", "Well-defined duties, routines, and protocols.", "An environment where their service is valued and contributes to a harmonious dynamic.", "Opportunities to demonstrate their skills and receive positive reinforcement for a job well done."],
        pathwaysToExploration: ["Create a list of 'Servant duties' with your Master/Mistress, outlining expectations.", "Develop or adopt a specific 'uniform' or attire that signifies your role.", "Practice formal modes of address and etiquette if desired.", "Focus on anticipating needs – what can you do before being asked to make your Master/Mistress's life easier or more pleasant?"]
      },
      Playmate: {
        title: "The Joyful Companion: Playmate", icon: "🎉",
        flavorText: "Let's explore, laugh, and create mischief together – life's an adventure best shared!",
        essence: "The Playmate is all about shared fun, adventure, and often, a touch of lighthearted mischief. They thrive in dynamics where exploration, laughter, and mutual enjoyment are key. Less focused on strict power exchange, a Playmate seeks a partner for exciting experiences, creative scenarios, and a generally high-energy, positive connection.",
        coreMotivations: ["To share laughter, fun, and exciting experiences with a partner.", "To engage in creative, imaginative, or adventurous play.", "To enjoy a lighthearted, energetic connection with less emphasis on strict roles.", "To explore new activities, kinks, or scenarios together with an enthusiastic partner."],
        keyCharacteristics: ["Energetic, enthusiastic, and always up for fun.", "Creative and imaginative, often suggesting new games or activities.", "Enjoys laughter, silliness, and a generally positive vibe.", "Adaptable and willing to try new things with a partner.", "Values companionship and shared enjoyment above strict power dynamics."],
        strengthsInDynamic: ["Keeps the dynamic lively, fresh, and full of laughter.", "Excellent at brainstorming new ideas for scenes or activities.", "Fosters a strong sense of camaraderie and friendship alongside any kink.", "Can help break down inhibitions and encourage mutual exploration."],
        potentialChallenges: ["May not be a good fit for partners seeking very serious or protocol-heavy dynamics.", "Energy levels might be overwhelming for quieter partners.", "Focus on 'fun' might sometimes overshadow deeper emotional processing if not balanced.", "Ensuring that 'play' still respects boundaries and consent, even when lighthearted."],
        thrivesWith: ["Another Playmate, or any partner who enjoys laughter, creativity, and adventurous exploration.", "Openness to trying new things and a willingness to be silly.", "A dynamic where shared fun and mutual enjoyment are prioritized.", "Partners who appreciate their enthusiasm and creative energy."],
        pathwaysToExploration: ["Brainstorm a list of 'adventure goals' or 'kinky bucket list' items to try together.", "Engage in role-play scenarios that are more about fun and story than strict power.", "Incorporate games, challenges, or friendly competitions into your interactions.", "Make a pact to always try to make each other laugh during your playtime."]
      },
      Babygirl: {
        title: "The Tender Heart: Babygirl", icon: "🌸",
        flavorText: "Spoil me with affection, guide me with kindness, and I'll blossom in your care.",
        essence: "The Babygirl (or Babyboy) blends innocence with a desire for nurturing, affection, and often, a touch of spoiling. They are typically younger-acting submissives who crave a gentle but firm guiding hand, often from a Daddy or Mommy figure. This style is about feeling cherished, protected, and a little bit indulged, within a framework of loving guidance.",
        coreMotivations: ["To feel deeply cherished, protected, and affectionately 'spoiled'.", "To embrace a younger, more innocent persona that invites nurturing care.", "To receive gentle guidance and clear boundaries from a loving authority figure.", "To build an intimate, trusting bond with a Daddy/Mommy who understands their needs."],
        keyCharacteristics: ["Often presents as sweet, innocent, and needing care.", "Craves affection, praise, and reassurance.", "May enjoy being 'babied' or indulged with treats, cute items, or special attention.", "Responds well to gentle but firm guidance and rules.", "Values emotional connection and feeling safe with their caregiver."],
        strengthsInDynamic: ["Elicits strong nurturing and protective instincts in a partner.", "Fosters a very sweet, affectionate, and often playful dynamic.", "Can be very devoted and eager to please their caregiver.", "Brings a sense of softness and tender intimacy to the relationship."],
        potentialChallenges: ["Requires a caregiver who genuinely enjoys the nurturing/guiding role and doesn't find it burdensome.", "Balancing the 'baby' persona with adult responsibilities and communication.", "Potential for the dynamic to become overly one-sided if the caregiver's needs are neglected.", "Ensuring the 'innocence' is a chosen persona and not an exploitation of vulnerability."],
        thrivesWith: ["A loving, patient, and firm Daddy or Mommy figure (or similar caregiver role).", "Clear communication about needs, boundaries, and desired level of 'babying'.", "Consistent affection, praise, and gentle but clear rules.", "Partners who find joy in nurturing, guiding, and occasionally spoiling their 'Babygirl/Babyboy'."] ,
        pathwaysToExploration: ["Discuss with your caregiver what aspects of being a 'Babygirl/Babyboy' appeal most (e.g., cute clothes, specific nicknames, routines).", "Create a 'rewards' system for good behavior (e.g., stickers, small treats, extra cuddle time).", "Explore gentle forms of discipline or guidance that feel affirming rather than punitive.", "Communicate openly about both 'little' needs and 'adult' needs to maintain balance."]
      },
      Captive: {
        title: "The Enthralling Subject: Captive", icon: "⛓️",
        flavorText: "In the exquisite tension of restraint, my will yields, and a deeper truth is found.",
        essence: "The Captive finds a unique thrill and profound surrender in the scenario of being held, restrained, or imprisoned (consensually). This style is about the intensity of helplessness, the psychological drama of confinement, and the deep trust placed in the Captor to manage the experience ethically. It's a journey into vulnerability and the power of yielding to an overwhelming force.",
        coreMotivations: ["To experience the intense psychological and physical sensations of (consensual) captivity.", "To surrender completely to a Captor, relinquishing all control and autonomy.", "To explore themes of helplessness, vulnerability, and interrogation/conditioning within a safe framework.", "To build a dynamic of extreme trust with a Captor who orchestrates the scenario."],
        keyCharacteristics: ["Enjoys scenarios involving restraint, confinement, or simulated imprisonment.", "Finds excitement in the feeling of helplessness and loss of control.", "May enjoy psychological play such as interrogation, 'brainwashing,' or tests of will.", "Places immense trust in their Captor to maintain safety and respect hard limits.", "Often experiences a profound sense of release or catharsis upon 'escape' or the scene's end."],
        strengthsInDynamic: ["Allows for intensely psychological and dramatic role-play scenarios.", "Can push boundaries of trust and vulnerability to profound levels.", "Offers a unique avenue for exploring powerlessness and surrender.", "Often involves intricate scene-setting and storytelling from the Captor."],
        potentialChallenges: ["Extremely high need for trust, clear communication, and pre-negotiated boundaries/safe words.", "Risk of psychological distress if scenes are too intense or hard limits are crossed.", "Physical safety with restraints and confinement methods is paramount.", "Aftercare is critical to process the intense emotions and physical sensations."],
        thrivesWith: ["A highly ethical, creative, and responsible Captor who excels at scene-setting and managing intensity.", "Meticulous pre-negotiation of all aspects of the captivity scenario, including duration, types of interaction, and hard limits.", "Unshakeable safe words and clear non-verbal distress signals.", "A Captor who is skilled in aftercare and helping the Captive decompress and process the experience."],
        pathwaysToExploration: ["Develop a detailed scenario with your Captor: What's the backstory? Why are you captive? What are the stakes?", "Experiment with different forms of restraint (ropes, cuffs, cages if safe and available).", "Explore psychological elements: interrogation (with pre-agreed topics), 'obedience training,' mental challenges.", "Plan for extensive aftercare, including debriefing the scene, physical comfort, and emotional support."]
      },
      Thrall: {
        title: "The Bound Soul: Thrall", icon: "🛐",
        flavorText: "My will is an echo of yours, my life a testament to your divinity. In this devotion, I am complete.",
        essence: "The Thrall offers a level of devotion and surrender that transcends typical submission, often bordering on worship or complete absorption into the will of their Master, Mistress, or Deity figure. This style is characterized by profound loyalty, unwavering obedience, and a desire to live entirely for and through their chosen Dominant. It is one of the most intense forms of power exchange, demanding absolute trust and ethical commitment.",
        coreMotivations: ["To experience an all-encompassing devotion and surrender of self to a revered figure.", "To find ultimate purpose and meaning in serving and worshipping their Dominant.", "To achieve a state of complete mental, emotional, and spiritual alignment with their Dominant's will.", "To build a bond of such profound depth that individuality merges into a shared existence."],
        keyCharacteristics: ["Exhibits absolute loyalty, devotion, and obedience.", "Often engages in acts of worship, reverence, or ritualistic service.", "May adopt a new identity or purpose entirely defined by their Dominant.", "Places complete and unwavering trust in their Dominant's wisdom and guidance.", "Experiences deep fulfillment and spiritual connection through their thralldom."],
        strengthsInDynamic: ["Creates a dynamic of unparalleled depth, intensity, and spiritual connection.", "Offers the Dominant a unique experience of absolute devotion and influence.", "Can lead to profound personal transformation and a sense of ultimate purpose for the Thrall.", "Fosters an unbreakable bond based on shared spirituality or philosophical alignment."],
        potentialChallenges: ["The highest possible risk of exploitation if the Dominant is not impeccably ethical and self-aware.", "Loss of individual identity and external connections can be a severe risk if not managed carefully.", "Requires an extraordinary level of psychological and emotional stability from both partners.", "Exiting such a dynamic can be incredibly difficult and traumatic if it sours."],
        thrivesWith: ["An exceptionally ethical, wise, and responsible Master/Mistress/Deity figure who understands the profound responsibility they hold.", "Intensive, ongoing negotiation and communication about boundaries, well-being, and the nature of the thralldom.", "Mechanisms for the Thrall to maintain connections to the outside world and a sense of core self, even within the devotion.", "A Dominant who prioritizes the Thrall's spiritual and emotional growth above their own gratification."],
        pathwaysToExploration: ["Engage in deep philosophical and spiritual discussions with your chosen Dominant to align your paths.", "Develop rituals, vows, or symbols that represent the depth of your thralldom.", "Explore forms of service and devotion that feel spiritually meaningful and fulfilling.", "Implement regular 'sanity checks' or periods of reflection to ensure the dynamic remains healthy and truly consensual at its deepest level."]
      },
      Puppet: {
        title: "The Responsive Marionette: Puppet", icon: "🎭",
        flavorText: "My strings are in your hands; I dance to the rhythm of your will, a perfect reflection of your art.",
        essence: "The Puppet thrives on being an extension of their Puppeteer's will, responding with precision and grace to every command, subtle or overt. This style is about exquisite responsiveness, adaptability, and the art of being perfectly controlled and manipulated (consensually). The Puppet finds joy in flawless execution and becoming a living instrument for their Puppeteer's creative expression.",
        coreMotivations: ["To achieve a state of perfect responsiveness and obedience to their Puppeteer.", "To be an instrument for their Puppeteer's creative or controlling desires.", "To experience the sensation of their body and actions being directed by another.", "To find satisfaction in flawless execution and mirroring their Puppeteer's intent."],
        keyCharacteristics: ["Highly attuned and responsive to their Puppeteer's commands (verbal, non-verbal, or even imagined).", "Often possesses excellent body control and the ability to execute precise movements or tasks.", "Enjoys being manipulated, posed, or directed in intricate ways.", "May feel a sense of 'blankness' or complete yielding of their own agency during play.", "Values clarity and precision in their Puppeteer's instructions."],
        strengthsInDynamic: ["Allows for highly creative and intricate scenes of control and manipulation.", "Offers the Puppeteer a unique experience of direct, responsive control over another.", "Can lead to a fascinating exploration of agency, will, and response.", "Often involves a high degree of non-verbal communication and attunement."],
        potentialChallenges: ["Requires a Puppeteer who is clear, precise, and creative in their direction.", "Physical strain or discomfort can arise from holding poses or performing repetitive actions.", "Maintaining the 'Puppet' state of responsiveness can be mentally demanding.", "Ensuring the Puppeteer remains aware of the Puppet's underlying needs and limits, even when they are 'blank'."] ,
        thrivesWith: ["A creative, precise, and attentive Puppeteer who enjoys orchestrating detailed scenarios.", "Clear and consistent signals or commands for direction.", "An understanding of the Puppet's physical limits and the need for breaks or adjustments.", "Puppeteers who appreciate the skill and focus required to be a truly responsive Puppet."],
        pathwaysToExploration: ["Practice responding to increasingly subtle cues from your Puppeteer.", "Explore scenarios where you are 'programmed' with specific responses or behaviors.", "Experiment with being controlled via 'strings' (real or imagined), remote cues, or whispered commands.", "Develop a system for the Puppet to signal limits or discomfort without breaking the 'inanimate' persona if desired."]
      },
      Maid: {
        title: "The Polished Perfectionist: Maid", icon: "🧼",
        flavorText: "In spotless perfection and courteous service, I find my quiet pride and reflect your high standards.",
        essence: "The Maid delights in creating and maintaining an environment of pristine order, cleanliness, and refined service. This style emphasizes meticulous attention to detail, unwavering politeness, and a dedication to upholding the high standards of their household or Master/Mistress. The Maid's satisfaction comes from a job perfectly done and the smooth, elegant functioning of their domain.",
        coreMotivations: ["To achieve and maintain a state of perfect order, cleanliness, and aesthetic appeal.", "To provide impeccable, courteous, and anticipatory service.", "To take pride in their skills of domestic management and refined service.", "To contribute to a harmonious and elegant environment for their Master/Mistress."],
        keyCharacteristics: ["Extremely tidy, organized, and attentive to the smallest details.", "Unfailingly polite, discreet, and often adheres to formal service etiquette.", "Takes initiative in maintaining cleanliness and order without needing to be asked.", "Often skilled in various domestic arts (cleaning, laundry, serving, organizing).", "Finds deep satisfaction in a perfectly managed environment and the approval of their Master/Mistress."],
        strengthsInDynamic: ["Creates a beautifully ordered, clean, and smoothly running household or space.", "Frees up their Master/Mistress from domestic concerns, allowing them to focus elsewhere.", "Embodies a sense of grace, efficiency, and quiet competence.", "Can elevate the aesthetic and comfort level of any environment significantly."],
        potentialChallenges: ["Can become overly focused on perfection to the point of stress if not managed.", "Requires a Master/Mistress who genuinely appreciates and acknowledges their meticulous efforts.", "May struggle if their standards are impossibly high or if the environment is constantly disrupted.", "Ensuring that the role of Maid doesn't overshadow other aspects of their identity or relationship if undesired."],
        thrivesWith: ["A Master or Mistress who values cleanliness, order, and refined service, and who provides clear expectations.", "An environment where their efforts are visible and contribute to a sense of harmony and elegance.", "Appreciation and acknowledgment for their hard work and attention to detail.", "Opportunities to take pride in their domain and the quality of their service."],
        pathwaysToExploration: ["Develop a detailed 'Maid's Handbook' outlining cleaning schedules, service protocols, and specific preferences of the Master/Mistress.", "Select a specific 'uniform' or attire that enhances the role and sense of professionalism.", "Practice formal serving techniques and etiquette.", "Focus on 'anticipatory service' – learning to foresee needs before they are expressed."]
      },
      Painslut: {
        title: "The Insatiable Devotee: Painslut", icon: "🔥",
        flavorText: "More. Deeper. Harder. My body is a canvas for your intensity, my spirit forged in the exquisite fire.",
        essence: "The Painslut is a specific type of Masochist characterized by an overt, often verbalized, craving for intense pain and sensation, frequently pushing their own limits and reveling in the extremity of the experience. This style is less about subtle transformation of pain and more about a raw, almost greedy, pursuit of intense physical input. Trust in the Sadist to deliver safely is still paramount.",
        coreMotivations: ["To experience the most intense physical sensations possible within their limits.", "To push their own boundaries of pain tolerance and endurance.", "To express a raw, almost primal, desire for intense physical input.", "To find a unique form of ecstasy or release through extreme, consensually inflicted pain."],
        keyCharacteristics: ["Openly and enthusiastically craves intense pain and sensation.", "Often has a very high pain threshold and a desire to test it.", "May use provocative language or behavior to elicit stronger responses from their Sadist.", "Values a Sadist who can deliver intense experiences safely and skillfully.", "Can be highly performative in their reception of pain, adding to the scene's energy."],
        strengthsInDynamic: ["Provides a highly energetic and intense experience for a Sadist who enjoys delivering strong sensations.", "Can push the boundaries of typical pain play into more extreme (but still consensual) territory.", "Often very clear and vocal about their desires for 'more'.", "Can create incredibly memorable and cathartic scenes for both participants."],
        potentialChallenges: ["Extremely high risk if safety, limits, and safe words are not impeccably respected.", "Distinguishing between 'playful begging for more' and genuine distress requires an exceptionally attuned Sadist.", "Potential for 'pain drunkenness' where judgment is impaired; Sadist must remain the responsible party.", "Intense aftercare is absolutely essential to manage physical and emotional aftermath."],
        thrivesWith: ["An extremely skilled, experienced, and ethical Sadist who understands how to deliver intense pain safely and read subtle cues.", "Iron-clad safe words and a deep, trusting relationship with their Sadist.", "Clear pre-negotiation of 'hard no's' and desired types of extreme sensation.", "A Sadist who is excellent at pacing, monitoring, and providing extensive aftercare."],
        pathwaysToExploration: ["Carefully explore your absolute hard limits and communicate them unshakeably to your Sadist.", "Experiment with different types of intense sensation to discover what you crave most (e.g., heavy impact, specific types of needles, electro-play at high (but safe!) levels).", "Practice clear and unambiguous communication for when 'more' truly means 'more' and when a limit is being approached.", "Develop an extremely robust aftercare plan focusing on both physical recovery and emotional grounding."]
      },
      Bottom: {
        title: "The Enduring Canvas: Bottom", icon: "⬇️",
        flavorText: "I receive, I endure, I transform. Your will is etched upon me, and in that yielding, I find my strength.",
        essence: "The Bottom is a broad archetype encompassing those who primarily receive in BDSM dynamics. This can involve receiving impact, sensation, instructions, or emotional energy. They are the canvas for the Top's actions, possessing qualities like receptiveness, endurance, and often, a deep capacity for trust and vulnerability. A Bottom's experience is about skillful receiving and transforming that input into a meaningful personal experience.",
        coreMotivations: ["To be receptive to a Top's actions, energy, and direction.", "To endure and process sensations, instructions, or emotional input skillfully.", "To find personal meaning, release, or connection through the act of receiving.", "To place trust in a Top to guide the experience ethically and satisfyingly."],
        keyCharacteristics: ["Highly receptive to various forms of input (physical, mental, emotional).", "Often possesses significant endurance or resilience.", "Values clear communication and trust with their Top.", "Skillful at processing and deriving meaning from the experiences they receive.", "Can range from passive to highly interactive in their 'bottoming' style."],
        strengthsInDynamic: ["Enables a Top to fully express their particular style of dominance or action.", "Can handle and transform a wide range of experiences.", "Often possesses deep self-awareness and understanding of their own responses.", "Facilitates a strong connection based on trust and the shared intensity of the experience."],
        potentialChallenges: ["Requires a Top who is skilled, ethical, and attentive to their needs and limits.", "Vulnerability is high; clear communication and safe words are essential.", "Risk of 'bottom drop' or emotional overwhelm post-scene; aftercare is crucial.", "Ensuring their own desires and limits within 'bottoming' are clearly expressed and respected."],
        thrivesWith: ["A skilled, attentive, and ethical Top who understands their specific 'bottoming' preferences and limits.", "Clear communication, safe words, and ongoing consent.", "Tops who are good at pacing, monitoring responses, and providing appropriate aftercare.", "Dynamics where their capacity to receive and endure is valued and respected."],
        pathwaysToExploration: ["Identify what kinds of 'input' you most enjoy receiving (e.g., physical sensation, psychological play, emotional intensity, specific tasks).", "Practice communicating your limits, desires, and feedback clearly to your Top(s).", "Develop your skills in 'riding the wave' of intense sensations or emotions.", "Create a personalized aftercare routine that helps you process and integrate your experiences."]
      },
 Disciplinarian: {
        title: "The Guiding Hand: Disciplinarian", icon: "✋",
        flavorText: "Order is not merely imposed; it is cultivated. And growth often blossoms under a firm, guiding hand.",
        essence: "The Disciplinarian finds satisfaction in structure, guidance, and the art of shaping behavior. They establish clear rules and expectations, not for the sake of power alone, but to foster growth, understanding, or a particular desired dynamic. Their approach is often firm, fair, and consistent, valuing the responsiveness of their partner.",
        coreMotivations: ["To create a structured environment where expectations are clear and understood.", "To guide and shape a partner's behavior, skills, or mindset constructively.", "To derive satisfaction from seeing rules understood, followed, and contributing to a positive dynamic.", "To test a partner's limits (consensually) and encourage their development and self-awareness."],
        keyCharacteristics: ["Firm, fair, and consistent in applying rules and consequences.", "Values order, clarity, and predictability.", "Observant of behavior and responses, providing clear feedback.", "Often patient but with clear expectations of compliance and effort.", "Can be stern when necessary, but often with underlying care, a specific goal, or even playful intent."],
        strengthsInDynamic: ["Provides a strong sense of security and predictability for those who thrive on structure.", "Excellent at 'taming' Brats, training Pets, or guiding those in service roles.", "Can help partners explore their limits, discover new aspects of their submission, and build discipline.", "Fosters clear communication about expectations, boundaries, and consequences."],
        potentialChallenges: ["Can become overly rigid or dogmatic if not balanced with empathy, flexibility, and humor.", "Risk of the submissive feeling policed or overly criticized rather than guided or cared for.", "Maintaining fairness and ensuring discipline feels constructive/playful rather than purely punitive.", "Requires ongoing consent, feedback, and adaptation to ensure methods are well-received and effective."],
        thrivesWith: ["A submissive who genuinely desires structure, clear rules, and guidance (e.g., Brat, Slave, Pet, Little needing boundaries).", "Partners who are responsive to feedback, willing to learn or adapt, and appreciate consistency.", "Clear communication about the *purpose* of the discipline (play, training, order, self-improvement).", "An understanding that discipline is a tool within a broader dynamic of care, respect, or playfulness."],
        pathwaysToExploration: ["Collaboratively establish a set of clear, understandable rules and agreed-upon consequences (and rewards!).", "Incorporate 'rewards' for compliance, effort, or improvement, not just consequences for infractions.", "Practice different tones of discipline – from playful sternness and teasing 'corrections' to serious instruction and firm boundary setting.", "Regularly check in with your partner (both in and out of dynamic) about how the disciplinary aspects are feeling and their effectiveness."]
      },
      Master: {
        title: "The Sovereign Architect: Master/Mistress", icon: "🎓",
        flavorText: "True command is not merely about chains, but about the profound responsibility of shaping a devoted life, mind, and spirit.",
        essence: "The Master or Mistress is an archetype of deep authority, profound responsibility, and often, an all-encompassing connection. They take on the comprehensive guidance and, at times, 'ownership' (consensual) of a submissive or slave, crafting a dynamic built on immense trust, clearly defined protocols, and mutual understanding. This role is less about fleeting scenes and more about a structured, ongoing relationship dynamic where the Dominant architects the framework of their shared world.",
        coreMotivations: ["To guide, mentor, and take profound responsibility for a devoted partner's well-being and growth within the dynamic.", "To create and maintain a highly structured and intentional dynamic with clear roles, expectations, and philosophies.", "To experience a deep, unbreakable bond of trust, loyalty, and consensual power exchange.", "To see their partner flourish, find fulfillment, and achieve their potential within the established framework."],
        keyCharacteristics: ["Authoritative, decisive, and exceptionally confident in their vision and leadership.", "Possesses a strong sense of responsibility, ethics, and commitment to their partner.", "Values loyalty, obedience, trust, and dedication implicitly.", "Often has a clear, long-term vision for the dynamic and its evolution.", "Communicates expectations, philosophies, and standards clearly and upholds them consistently.", "Deeply invested in the holistic well-being (emotional, mental, physical, spiritual) of their submissive/slave."],
        strengthsInDynamic: ["Provides a powerful sense of stability, security, purpose, and direction for their submissive/slave.", "Fosters unparalleled levels of trust, intimacy, and a unique, profound connection.", "Can facilitate significant personal growth, self-discovery, and exploration for both partners within a safe structure.", "Creates a unique and deeply meaningful bond that often transcends typical relationship paradigms."],
        potentialChallenges: ["The weight of total responsibility can be immense and requires exceptional self-awareness and resilience.", "Requires extraordinary communication, negotiation, and conflict-resolution skills.", "The inherent power imbalance necessitates constant ethical consideration and vigilance against complacency or unintentional harm.", "Finding a partner truly suited for, desiring, and capable of thriving within such a deep and total level of power exchange."],
        thrivesWith: ["A Slave, Submissive, or Thrall who deeply desires, understands, and enthusiastically consents to this level of structured, total power exchange.", "Meticulous, ongoing negotiation and codification of all aspects of the dynamic (e.g., via a 'contract' or living protocols).", "Unwavering commitment to open communication, regular feedback, and reassessment of the relationship's health and goals.", "A strong ethical compass, profound empathy, and an unshakeable commitment to the well-being, growth, and happiness of their partner."],
        pathwaysToExploration: ["Engage in extensive, deep, and ongoing negotiation to create a 'contract,' set of protocols, or shared philosophy that outlines every facet of the dynamic.", "Develop rituals, routines, and forms of address that reinforce the roles, connection, and shared vision.", "Continuously educate oneself on ethical power exchange, communication, relationship psychology, and consent.", "Schedule regular 'out-of-dynamic' state-of-the-union check-ins to ensure ongoing consent, satisfaction, and mutual growth."]
      },
      Nurturer: {
        title: "The Gentle Guardian: Nurturer", icon: "🤗",
        flavorText: "In my care, you find your sanctuary; in my guidance, your spirit takes flight.",
        essence: "The Nurturer blends control with profound empathy and a desire to foster growth and well-being. They create a dynamic where guidance feels like a warm embrace, and rules are rooted in care and understanding. This style is about providing a safe, supportive space for their partner to explore, heal, or simply be cherished and protected.",
        coreMotivations: ["To provide a safe, loving, and supportive environment for their partner.", "To foster their partner's emotional, personal, or submissive growth through gentle guidance.", "To derive joy from caring for, protecting, and uplifting another.", "To build a dynamic based on deep trust, emotional intimacy, and mutual comfort."],
        keyCharacteristics: ["Deeply empathetic, patient, and understanding.", "Prioritizes their partner's emotional well-being and safety.", "Guides with gentle firmness rather than harsh commands.", "Excellent listener and often provides wise counsel.", "Enjoys creating a comfortable, secure, and loving atmosphere."],
        strengthsInDynamic: ["Creates an exceptionally safe space for vulnerability and emotional exploration.", "Ideal for partners who are new to BDSM, have past trauma, or thrive on gentle encouragement (e.g., Littles, Pets, sensitive Submissives).", "Builds profound emotional intimacy and trust.", "Can be incredibly healing and affirming for both partners."],
        potentialChallenges: ["May sometimes struggle with setting firm boundaries if their partner pushes too far, due to inherent kindness.", "Can sometimes be perceived as 'too soft' by submissives seeking very strict discipline (unless that's also part of their range).", "Emotional labor can be high; Nurturer also needs self-care and support.", "Ensuring their own needs within the dynamic are also met and not constantly deferred."],
        thrivesWith: ["Partners who crave emotional safety, gentle guidance, and a deeply caring connection (e.g., Littles, Pets, anxious or shy Submissives).", "Open communication about emotional needs and comfort levels.", "A partner who reciprocates care and appreciation in their own way.", "Dynamics where emotional connection and mutual well-being are paramount."],
        pathwaysToExploration: ["Focus on creating comforting rituals and routines.", "Practice active listening and empathetic responses.", "Explore non-punitive forms of guidance and boundary setting (e.g., gentle reminders, positive reinforcement).", "Discuss what makes your partner feel most safe, cherished, and understood, and incorporate those elements regularly."]
      },
      Sadist: {
        title: "The Artisan of Sensation: Sadist", icon: "😏",
        flavorText: "In the crucible of sensation, where pleasure and pain dance, true connection is forged with exquisite care.",
        essence: "The Sadist finds art, excitement, and a unique form of connection in the consensual, ethical, and skillful infliction of pain or intense psychological challenge. This is not about cruelty, but about understanding a partner's desires and limits, and orchestrating an experience that can be cathartic, euphoric, or deeply transformative for the Masochist. The ethical Sadist is a master of control, empathy, and sensation.",
        coreMotivations: ["To explore the complex interplay of pain and pleasure in a consensual framework.", "To master the art and skill of various sensation-infliction techniques.", "To connect deeply with a Masochist through shared intensity and trust.", "To elicit powerful emotional and physical responses, leading to euphoria or catharsis for their partner."],
        keyCharacteristics: ["Skillful and knowledgeable about various pain/sensation techniques and safety.", "Highly attuned to their Masochist's responses, limits, and desires.", "Employs control and precision in the application of stimuli.", "Values clear communication, consent, and safe words above all.", "Understands the importance of and provides thorough aftercare."],
        strengthsInDynamic: ["Can provide incredibly intense, euphoric, and transformative experiences for a Masochist.", "Builds extreme levels of trust and intimacy through shared vulnerability and intensity.", "Often highly creative in designing scenes and experiences.", "Demonstrates profound control and understanding of their partner's psyche and physiology."],
        potentialChallenges: ["Requires constant vigilance regarding safety and consent; the potential for harm is real if not ethical.", "Misunderstanding or misjudging a Masochist's limits can have serious consequences.", "Emotional intensity for both parties can be high; self-awareness and emotional regulation are key.", "Societal stigma or misunderstanding of consensual sadomasochism."],
        thrivesWith: ["A Masochist who is communicative, knows their limits, and trusts them implicitly.", "Meticulous negotiation of limits, desired sensations, and safe words before any scene.", "A shared understanding of risk and a commitment to harm reduction.", "A deep respect for the Masochist's experience and a commitment to their well-being, especially through aftercare."],
        pathwaysToExploration: ["Educate yourself continuously on safety, anatomy, different types of pain/sensation, and implement use.", "Start with less intense sensations and gradually escalate based on your partner's feedback and desire.", "Practice 'reading' your Masochist's verbal and non-verbal cues very carefully.", "Develop a comprehensive aftercare ritual that addresses both physical and emotional needs post-scene."]
      },
      Owner: {
        title: "The Possessive Guardian: Owner", icon: "🔑",
        flavorText: "Mine to cherish, mine to guide, mine to protect. In this bond, we both find our unique purpose.",
        essence: "The Owner feels a deep sense of possession, responsibility, and often affection for their Pet or property (consensual). This style is about providing structure, care, training (if applicable), and a clear sense of belonging. The Owner takes pride in their Pet's well-being, behavior, and the unique bond they share, which can range from playful to deeply emotional and possessive.",
        coreMotivations: ["To experience a deep sense of loving possession and responsibility for another.", "To provide care, guidance, and structure within a pet play or similar ownership dynamic.", "To take pride in their 'Pet's' happiness, obedience, and development.", "To enjoy a unique, often non-traditional, bond of loyalty and affection."],
        keyCharacteristics: ["Possessive (in a caring, protective way), responsible, and often affectionate.", "Enjoys setting rules, providing 'training,' and establishing routines for their Pet.", "Takes pride in their Pet's appearance, behavior, and well-being.", "Values loyalty and a clear sense of their Pet 'belonging' to them.", "Often uses specific terms of endearment or ownership markers (e.g., collars)."],
        strengthsInDynamic: ["Provides a strong sense of security, belonging, and purpose for the Pet.", "Can foster a very playful, affectionate, and unique bond.", "Excellent at providing structure and clear expectations, which many Pets thrive on.", "Often very attentive to their Pet's needs and moods."],
        potentialChallenges: ["Ensuring 'possession' remains caring and respectful, not demeaning or overly controlling (unless specifically negotiated).", "Balancing the 'Pet' persona with the human needs of the partner.", "Communication can be complex if the Pet is primarily non-verbal in persona.", "Finding a partner who genuinely desires and thrives in an ownership dynamic."],
        thrivesWith: ["A Pet (Puppy, Kitten, etc.) or property-style submissive who desires this specific kind of possessive, caring bond.", "Clear negotiation about the terms of 'ownership,' expectations, and treatment.", "Consistent affection, praise, and clear guidance/rules.", "A mutual enjoyment of the specific roles and the unique connection it fosters."],
        pathwaysToExploration: ["Discuss and define what 'ownership' means to both of you in practical terms.", "Establish clear rules, routines, and 'training' goals if applicable (e.g., for a Puppy).", "Explore gear that signifies ownership and enhances the Pet persona (collars, tags, leashes).", "Practice different forms of affection, praise, and care that resonate with the Pet's persona and needs."]
      },
      Dominant: {
        title: "The Confident Guide: Dominant", icon: "👤",
        flavorText: "With clarity of vision and strength of will, I shape our path, fostering trust in every step.",
        essence: "The Dominant is a foundational archetype embodying authority, confidence, and the desire to lead and guide within a power exchange dynamic. They take responsibility for the direction and safety of scenes or relationships, deriving satisfaction from their partner's willing submission and the harmonious execution of their shared desires. Ethical leadership and clear communication are hallmarks of a skilled Dominant.",
        coreMotivations: ["To lead, guide, and take responsibility within a consensual power dynamic.", "To experience the satisfaction of their partner's willing surrender and trust.", "To shape and direct scenes or interactions according to a shared or personal vision.", "To build a strong, trusting connection through the clear exercise of authority and care."],
        keyCharacteristics: ["Authoritative, confident, and decisive in their actions and communication.", "Takes responsibility for the safety, well-being, and satisfaction of their submissive.", "Values clear communication, consent, and respect for boundaries.", "Enjoys planning, directing, and controlling aspects of a scene or dynamic.", "Often possesses a strong presence and natural leadership qualities."],
        strengthsInDynamic: ["Provides clear direction, structure, and a sense of security for their submissive.", "Facilitates the submissive's ability to let go and explore their desires safely.", "Can create well-orchestrated and deeply satisfying scenes or dynamics.", "Builds strong bonds based on trust, respect, and clear power exchange."],
        potentialChallenges: ["Can become overly controlling or authoritarian if not balanced with empathy and communication.", "The weight of responsibility requires constant self-awareness and ethical consideration.", "Misinterpreting a submissive's needs or limits can lead to negative experiences.", "Requires ongoing learning and adaptation to different partners and situations."],
        thrivesWith: ["A Submissive, Slave, or other yielding partner who appreciates clear leadership and direction.", "Open and honest communication about desires, limits, and feedback from both sides.", "A mutual understanding and respect for the roles and responsibilities within the power exchange.", "Partners who are willing to trust their guidance and explore within consensually defined boundaries."],
        pathwaysToExploration: ["Practice clear and concise communication of your intentions and instructions.", "Develop your skills in reading your partner's verbal and non-verbal cues.", "Explore different styles of leadership – from firm and commanding to gentle and guiding.", "Continuously educate yourself on BDSM safety, ethics, and communication techniques."]
      },
      Assertive: {
        title: "The Bold Initiator: Assertive", icon: "💪",
        flavorText: "I see what I want, and I take it – with power, passion, and unwavering intent.",
        essence: "The Assertive Dominant is characterized by their boldness, directness, and often intense energy. They are confident in their desires and unafraid to take initiative, often driving scenes with a powerful presence. This style is less about subtle guidance and more about decisive action and a clear projection of authority.",
        coreMotivations: ["To express their desires and authority with boldness and confidence.", "To take decisive control and initiate action within a dynamic.", "To experience the thrill of direct power and its impact.", "To engage with partners who respond to and appreciate a strong, assertive lead."],
        keyCharacteristics: ["Bold, direct, and often has a commanding presence.", "Confident in making decisions and taking initiative.", "May enjoy intense or high-energy scenes.", "Values clear responses and a partner who can match or yield to their energy.", "Can be highly focused and driven in pursuing their objectives within a scene."],
        strengthsInDynamic: ["Excellent at initiating scenes and driving action forward.", "Can be very exciting and invigorating for partners who enjoy a strong, direct lead.", "Often very clear about their intentions and desires.", "Can break through hesitation and create a sense of powerful momentum."],
        potentialChallenges: ["Directness can sometimes be perceived as aggressive or overwhelming if not calibrated to the partner.", "Requires a partner who is comfortable with and enjoys a very strong, assertive style.", "May need to consciously practice patience and active listening to ensure partner's needs are met.", "Balancing assertiveness with empathy and ongoing consent checks is crucial."],
        thrivesWith: ["Partners who are drawn to and can handle a strong, assertive, and intense style of dominance (e.g., some Submissives, Brats who enjoy a firm hand, Masochists seeking intense delivery).", "Clear communication of boundaries and limits from the partner, as the Assertive type may push.", "Dynamics where decisive action and clear authority are valued.", "Opportunities to express their power and drive in a focused way."],
        pathwaysToExploration: ["Practice modulating your intensity to suit different partners and situations.", "Focus on clear, unambiguous communication of your desires and expectations.", "Explore scenarios that allow for decisive action and a strong projection of power.", "Develop your ability to read subtle cues from your partner to ensure your assertiveness remains welcome and consensual."]
      },
      Strict: {
        title: "The Orderly Architect: Strict", icon: "📏",
        flavorText: "In precision, there is beauty; in adherence, there is harmony. My standards shape our perfection.",
        essence: "The Strict Dominant values order, precision, and adherence to clearly defined rules and protocols. They find satisfaction in a well-regulated dynamic where expectations are explicit and consistently met. This style is less about emotional nuance and more about the flawless execution of a structured system, often involving detailed instructions and specific consequences for infractions.",
        coreMotivations: ["To create and maintain a highly ordered and predictable environment or dynamic.", "To see rules and protocols followed with precision and consistency.", "To derive satisfaction from the flawless execution of tasks or behaviors.", "To uphold high standards and expect excellence from their submissive."],
        keyCharacteristics: ["Values order, rules, and precise adherence to instructions.", "Often detail-oriented and meticulous in their planning and expectations.", "Consistent in applying rules and consequences.", "May have a formal or exacting demeanor.", "Expects high levels of discipline and focus from their submissive."],
        strengthsInDynamic: ["Provides extreme clarity and predictability, which can be very comforting for some submissives.", "Excellent for dynamics involving complex protocols, training, or specific behavioral expectations.", "Can foster a high degree of discipline and attention to detail in a submissive.", "Often very clear and unambiguous in their communication of expectations."],
        potentialChallenges: ["Can be perceived as overly rigid, cold, or inflexible if not balanced with some understanding.", "Risk of the submissive feeling constantly scrutinized or failing to meet impossibly high standards.", "Requires a submissive who genuinely thrives on and desires such a high degree of structure and precision.", "Maintaining motivation for the submissive if the dynamic feels overly punitive or lacks positive reinforcement."],
        thrivesWith: ["Submissives or Slaves who crave and excel within a highly structured, rule-based dynamic.", "Clear, detailed, and mutually agreed-upon rules, protocols, and consequences.", "Partners who are highly attentive to detail and committed to meeting exacting standards.", "Dynamics where precision, order, and disciplined adherence are primary goals."],
        pathwaysToExploration: ["Develop a comprehensive 'Rule Book' or set of protocols with your submissive.", "Practice clear, precise, and unambiguous communication of instructions and expectations.", "Incorporate systems for monitoring adherence and providing feedback (both corrective and positive).", "Explore scenarios that require meticulous execution and adherence to complex instructions (e.g., formal service, intricate rituals)."]
      },
      Mistress: {
        title: "The Sovereign Grace: Mistress", icon: "👸",
        flavorText: "Adore my power, delight in my whims, and you shall know the exquisite pleasure of serving true elegance.",
        essence: "The Mistress commands with an air of regal authority, often blending sensuality, creativity, and a touch of imperious expectation. She expects devotion, service, and admiration, enjoying the aesthetic of power and the artful submission of her subjects. This style is often characterized by elegance, confidence, and a refined approach to dominance.",
        coreMotivations: ["To embody and project an aura of powerful, elegant, and often sensual authority.", "To be admired, adored, and served with devotion and skill.", "To creatively direct scenes and subjects according to her refined tastes and desires.", "To enjoy the aesthetic and psychological pleasures of commanding willing submission."],
        keyCharacteristics: ["Confident, elegant, and often possesses a regal or imperious demeanor.", "Values beauty, refinement, and skilled service or devotion.", "Creative in her demands and expectations, enjoying a touch of theatricality.", "Expects admiration, obedience, and often a degree of worship or pampering.", "Can be both demanding and rewarding, often with a sophisticated sense of humor or irony."],
        strengthsInDynamic: ["Creates an atmosphere of elegance, heightened sensation, and devoted service.", "Inspires deep admiration and a desire to please in her submissives.", "Often highly creative in scene design and psychological play.", "Can be incredibly empowering for the Mistress and profoundly satisfying for her subjects."],
        potentialChallenges: ["High expectations can be difficult for some submissives to meet consistently.", "Requires submissives who are genuinely drawn to and appreciate her specific style of authority and aesthetics.", "Maintaining the 'Mistress' persona of elegance and control requires effort and confidence.", "Can sometimes be perceived as aloof or unapproachable if not balanced with moments of connection (if desired)."],
        thrivesWith: ["Submissives, Slaves, or Servants who are devoted, attentive, skilled, and appreciate her aesthetic and authority.", "An environment that allows for the expression of her elegance and creativity.", "Partners who enjoy fulfilling her desires with grace and enthusiasm.", "Opportunities to be admired, pampered (if desired), and to exercise her creative command."],
        pathwaysToExploration: ["Cultivate your unique 'Mistress' persona – what are your specific tastes, demands, and preferred aesthetics?", "Explore elegant attire, props, and settings that enhance your aura of authority.", "Practice delivering commands with confidence, grace, and perhaps a touch of playful imperiousness.", "Design scenes or tasks that require skill, devotion, and aesthetic appeal from your submissive."]
      },
      Daddy: {
        title: "The Protective Patriarch: Daddy", icon: "👨‍🏫",
        flavorText: "Under my wing, you are safe; by my rules, you will grow. My love is firm, my guidance true.",
        essence: "The Daddy figure blends authority with deep care, protection, and a guiding hand, often for a 'Little' or 'Babygirl/Babyboy'. This style is about providing a secure, structured environment where their charge can explore innocence, receive affection, and learn through loving discipline. A Daddy is both a firm authority and a tender protector.",
        coreMotivations: ["To provide protection, guidance, and a sense of security to their 'Little' or charge.", "To nurture their charge's growth and well-being through a blend of affection and firm rules.", "To enjoy a dynamic of loving authority and dependent affection.", "To take on a paternal role of responsibility and care within a consensual framework."],
        keyCharacteristics: ["Authoritative yet caring, firm yet affectionate.", "Enjoys setting rules, providing guidance, and offering praise or (loving) discipline.", "Protective of their charge's emotional and physical well-being.", "Often enjoys 'spoiling' or indulging their charge within set boundaries.", "Values trust, open communication, and the well-being of their 'Little'."] ,
        strengthsInDynamic: ["Creates a very safe, secure, and nurturing environment for a 'Little' or 'Babygirl/Babyboy'.", "Excellent at balancing affection with necessary rules and boundaries.", "Can be deeply affirming and healing for those who desire a paternal caregiver figure.", "Fosters a strong bond of trust, love, and playful dependence."],
        potentialChallenges: ["Requires genuine enjoyment of the paternal/caregiver role; can be demanding.", "Balancing the 'Daddy' persona with adult relationship dynamics and communication.", "Ensuring discipline remains loving and constructive, not genuinely punitive or harmful.", "Navigating the complexities of age play dynamics ethically and consensually."],
        thrivesWith: ["A 'Little', 'Babygirl/Babyboy', or similar submissive who craves paternal care, guidance, and affection.", "Clear communication about needs, boundaries, and expectations from both sides.", "A mutual enjoyment of the age play dynamic and the specific roles within it.", "Partners who appreciate the blend of firm authority and tender affection that a Daddy provides."],
        pathwaysToExploration: ["Establish clear 'house rules' and routines for your 'Little'.", "Explore different ways of showing affection, praise, and (if desired) gentle discipline.", "Engage in age-appropriate play and activities that your 'Little' enjoys.", "Practice consistent communication about both 'in-role' and 'out-of-role' needs and feelings."]
      },
      Mommy: {
        title: "The Nurturing Matriarch: Mommy", icon: "👩‍🏫",
        flavorText: "Come, rest in my warmth, trust in my wisdom. My embrace is your haven, my rules your gentle guide.",
        essence: "The Mommy figure offers a blend of loving care, emotional support, and gentle yet firm guidance, often for a 'Little' or 'Pet'. This style is characterized by warmth, patience, and a desire to create a safe, comforting space for her charge to explore, be vulnerable, and feel unconditionally loved. A Mommy is both a tender comforter and a wise guide.",
        coreMotivations: ["To provide unconditional love, comfort, and emotional support to her 'Little' or charge.", "To nurture her charge's emotional well-being and encourage their self-expression.", "To enjoy a dynamic of tender affection and trusting dependence.", "To embody a maternal role of care, wisdom, and gentle authority within a consensual dynamic."],
        keyCharacteristics: ["Warm, affectionate, patient, and deeply empathetic.", "Enjoys providing comfort, reassurance, and gentle guidance.", "Prioritizes her charge's emotional safety and happiness.", "Often skilled at creating a cozy, secure, and loving environment.", "Values open emotional expression and a strong bond of trust."],
        strengthsInDynamic: ["Creates an exceptionally safe and loving space for emotional vulnerability and expression.", "Ideal for 'Littles', 'Pets', or anyone seeking deep maternal comfort and care.", "Fosters profound emotional intimacy and a strong sense of being unconditionally accepted.", "Can be incredibly healing, affirming, and soothing for her charge."],
        potentialChallenges: ["Emotional labor can be very high; Mommies also need self-care and support.", "Balancing the 'Mommy' persona with adult relationship dynamics.", "Ensuring guidance remains gentle and supportive, not inadvertently shaming or overly controlling.", "Navigating the complexities of age play or maternal dynamics ethically and with clear consent."],
        thrivesWith: ["A 'Little', 'Pet', or similar submissive who craves maternal warmth, emotional support, and gentle care.", "Open and honest communication about emotional needs, comfort levels, and boundaries.", "A mutual enjoyment of the specific maternal/nurturing dynamic.", "Partners who cherish the deep emotional connection and tender care a Mommy provides."],
        pathwaysToExploration: ["Focus on creating comforting rituals like bedtime stories, preparing favorite snacks, or shared quiet time.", "Practice active listening and providing empathetic reassurance.", "Explore gentle ways to set boundaries or offer guidance that feel loving and supportive.", "Discuss what makes your charge feel most loved, safe, and understood, and make those a regular part of your interaction."]
      },
      Rigger: {
        title: "The Rope Artisan: Rigger", icon: "🪢",
        flavorText: "With every knot, a story unfolds; in every line, a breath is held. My art is written on your form.",
        essence: "The Rigger is an artist and technician who uses rope to create intricate ties, aesthetic patterns, and unique sensory experiences for their Rope Bunny. This style blends creativity with a deep understanding of safety, anatomy, and rope mechanics. A skilled Rigger transforms their partner into living sculpture, fostering a profound dynamic of trust, control, and shared artistic expression.",
        coreMotivations: ["To create beautiful, intricate, and sensorially interesting rope art using a human canvas.", "To master the technical skills and safety knowledge required for complex rope work.", "To experience a deep, focused connection with their Rope Bunny through the shared act of tying.", "To explore themes of restraint, helplessness, and aesthetic control in a safe and artistic manner."],
        keyCharacteristics: ["Highly skilled in various rope tying techniques (e.g., shibari, western).", "Possesses a strong understanding of anatomy, nerve paths, and safety protocols for bondage.", "Creative and often has a distinct artistic style or vision.", "Patient, precise, and highly communicative with their Rope Bunny before, during, and after a tie.", "Values trust and their Rope Bunny's well-being above all else."],
        strengthsInDynamic: ["Can create visually stunning and deeply moving experiences for both Rigger and Rope Bunny.", "Facilitates a unique, intense, and often non-verbal form of communication and trust.", "Allows for the exploration of complex sensations, from constrictive pressure to suspension (if skilled and safe).", "Transforms the human body into a work of art, fostering a deep appreciation for form and line."],
        potentialChallenges: ["Requires extensive learning, practice, and unwavering attention to safety to avoid injury.", "The responsibility for the Rope Bunny's physical well-being is immense.", "Miscommunication or misjudgment of a Rope Bunny's limits can have serious consequences.", "Finding suitable spaces and equipment for more complex ties or suspensions."],
        thrivesWith: ["A communicative, trusting Rope Bunny who appreciates their artistry and respects safety protocols.", "Continuous learning and practice of rope techniques and safety measures.", "Meticulous pre-tie negotiation of limits, desires, and emergency signals.", "A commitment to thorough aftercare, including checking for any marks or discomfort."],
        pathwaysToExploration: ["Study different styles of rope bondage (e.g., Japanese shibari, Western decorative, suspension).", "Practice foundational knots and patterns on an inanimate object or willing (and patient) partner, always prioritizing safety.", "Learn about anatomy, particularly nerve clusters and circulation, to avoid injury.", "Develop clear communication signals with your Rope Bunny for comfort levels, adjustments, and emergency stops."]
      },
      Hunter: {
        title: "The Primal Pursuer: Hunter", icon: "🏹",
        flavorText: "The scent of fear, the thrill of the chase, the inevitable capture – this is the ancient dance that calls to my blood.",
        essence: "The Hunter thrives on the primal dynamic of pursuit, tracking, and consensual capture of their Prey. This style is about strategy, patience, building suspense, and the exhilarating moment of outwitting or overpowering their quarry. The ethical Hunter ensures the chase is thrilling but safe, and the capture is a satisfying culmination for both.",
        coreMotivations: ["To engage in a primal, instinctual game of pursuit and capture.", "To experience the thrill of strategy, tracking, and outmaneuvering their Prey.", "To build suspense and an atmosphere of exciting (consensual) fear or anticipation.", "To achieve a satisfying 'capture' that fulfills the dynamic for both Hunter and Prey."],
        keyCharacteristics: ["Strategic, patient, and often enjoys building suspense.", "Observant and skilled at 'tracking' or anticipating their Prey's moves.", "Can create a thrilling atmosphere of (consensual) danger or inevitability.", "Values clear rules of engagement and safety protocols for the 'hunt'.", "Ensures the 'capture' is a fulfilling experience, respecting pre-negotiated limits."],
        strengthsInDynamic: ["Creates highly exciting, adrenaline-fueled scenes for both participants.", "Allows for exploration of primal instincts and power dynamics in a unique way.", "Often involves creative use of environment and psychological tactics.", "Builds a strong sense of anticipation and release upon capture."],
        potentialChallenges: ["Requires meticulous attention to safety, especially if the 'hunt' involves physical elements or a large space.", "Distinguishing between playful 'fear' and genuine distress in the Prey is crucial.", "Clear safe words and de-escalation protocols are absolutely essential.", "Aftercare is needed to help both Hunter and Prey come down from the adrenaline high."],
        thrivesWith: ["A Prey who enjoys the thrill of the chase, understands the consensual nature of the 'fear', and communicates limits clearly.", "Clearly defined rules for the 'hunt' (e.g., boundaries of the hunting ground, allowed tactics, signals for pause or stop).", "An environment that lends itself to a 'chase' scenario (physical or metaphorical).", "A mutual understanding that the primary goal is a thrilling, shared experience, not genuine harm."],
        pathwaysToExploration: ["Design specific 'hunt' scenarios with your Prey – what are they trying to achieve? What are your objectives?", "Incorporate elements of stealth, tracking, or setting 'traps' (metaphorical or safe physical ones).", "Vary the intensity and duration of the 'chase' to build suspense.", "Negotiate different outcomes for 'capture' – restraint, interrogation, a shift to a different type of play?"]
      },
      Trainer: {
        title: "The Skillful Cultivator: Trainer", icon: "🏋️",
        flavorText: "With patience and precision, I shape behavior, unlock potential, and celebrate every step of progress.",
        essence: "The Trainer focuses on guiding, teaching, and shaping the behavior or skills of their submissive, Pet, or trainee. This style is about patience, clear instruction, consistent reinforcement (positive and sometimes corrective), and celebrating progress. A skilled Trainer derives satisfaction from their trainee's development and mastery of desired behaviors or abilities.",
        coreMotivations: ["To guide and develop a trainee's skills, behaviors, or obedience through structured methods.", "To experience the satisfaction of seeing their trainee learn, improve, and succeed.", "To establish clear expectations and use consistent reinforcement to achieve desired outcomes.", "To build a dynamic based on learning, discipline, and mutual respect for the training process."],
        keyCharacteristics: ["Patient, methodical, and clear in their instructions.", "Skilled at breaking down complex tasks or behaviors into manageable steps.", "Uses consistent reinforcement (praise, rewards, or corrective measures if negotiated).", "Observant of their trainee's progress and adapts methods as needed.", "Takes pride in their trainee's achievements and development."],
        strengthsInDynamic: ["Excellent for partners who desire to learn specific skills, behaviors, or deepen their obedience (e.g., Pets, Slaves, service-oriented submissives).", "Provides a clear path for growth and development within the dynamic.", "Fosters discipline, focus, and a sense of accomplishment for the trainee.", "Builds a strong bond based on mentorship, guidance, and shared goals."],
        potentialChallenges: ["Requires significant patience and consistency from the Trainer.", "Training methods must be consensual and tailored to the trainee's learning style and limits.", "Can become frustrating for either party if progress is slow or expectations are unrealistic.", "Ensuring 'correction' remains constructive and doesn't become demeaning or abusive."],
        thrivesWith: ["A trainee (Pet, Slave, submissive) who is eager to learn, responsive to guidance, and motivated to improve.", "Clear, achievable training goals and a well-defined training plan.", "Consistent application of reinforcement and feedback.", "A mutual understanding that training is a journey requiring effort and patience from both sides."],
        pathwaysToExploration: ["Collaboratively define specific skills or behaviors to be trained.", "Develop a 'training schedule' and methods (e.g., clicker training for Pets, task lists for Servants, obedience drills).", "Implement a clear system of rewards for success and (if negotiated) corrective actions for non-compliance.", "Regularly review progress, adjust goals, and celebrate achievements together."]
      },
      Puppeteer: {
        title: "The Master Manipulator: Puppeteer", icon: "🎭",
        flavorText: "Every gesture, every breath, every thought – all dance to the silent music of my will. You are my perfect creation.",
        essence: "The Puppeteer delights in exercising intricate, often subtle, control over their Puppet, directing their actions, words, and sometimes even their perceived thoughts. This style is about achieving a state of perfect, responsive manipulation, where the Puppet becomes an extension of the Puppeteer's creative or controlling vision. It's a highly psychological and often artistic form of dominance.",
        coreMotivations: ["To experience the sensation of complete and responsive control over another.", "To creatively direct and manipulate their Puppet's actions, expressions, and responses.", "To explore themes of agency, free will (or lack thereof), and psychological influence.", "To achieve a perfect synchronicity where the Puppet flawlessly enacts the Puppeteer's intent."],
        keyCharacteristics: ["Highly creative, often with a clear artistic or psychological vision for their Puppet.", "Skilled at using subtle cues, commands, or conditioning to influence their Puppet.", "Enjoys intricate control over details of their Puppet's behavior and presentation.", "Values responsiveness, precision, and a Puppet's ability to yield their own agency.", "May engage in psychological play, suggestion, or 'programming'."] ,
        strengthsInDynamic: ["Allows for deeply psychological and highly creative scenes of control and influence.", "Can create a profound sense of connection and attunement between Puppeteer and Puppet.", "Offers a unique exploration of power, agency, and the nature of will.", "Often results in visually or behaviorally striking performances from the Puppet."],
        potentialChallenges: ["Requires a Puppet who is exceptionally receptive, trusting, and willing to yield their agency.", "Psychological manipulation, even consensual, requires extreme ethical awareness and care.", "Distinguishing between the Puppet's genuine needs/limits and their 'programmed' responses can be complex.", "Aftercare is crucial to help the Puppet reintegrate and process the experience of yielded control."],
        thrivesWith: ["A highly receptive, trusting Puppet who enjoys yielding control and responding to intricate direction.", "Clear communication and negotiation of the limits and nature of the psychological manipulation.", "A deep understanding of the Puppet's psychology and triggers to ensure play remains safe and consensual.", "Puppeteers who are highly ethical and prioritize their Puppet's well-being throughout the intense experience."],
        pathwaysToExploration: ["Develop a 'character' or persona for your Puppet and 'program' them with specific behaviors, phrases, or responses.", "Experiment with different methods of control: verbal commands, non-verbal cues, written instructions, hypnotic suggestion (if skilled and ethical).", "Create scenarios where the Puppet must navigate tasks or interactions based solely on your direction.", "Explore themes of 'mind control,' robotic obedience, or becoming a living avatar for the Puppeteer."]
      },
      Protector: {
        title: "The Steadfast Shield: Protector", icon: "🛡️",
        flavorText: "Fear not, little one, for I am your fortress. My strength is your sanctuary, my vigilance your peace.",
        essence: "The Protector is driven by a powerful instinct to shield, defend, and ensure the safety and well-being of their charge. This style blends authority with deep care and vigilance, creating a haven where their partner can feel utterly secure and free from harm or worry. A Protector's dominance is expressed through unwavering support and a readiness to stand against any threat.",
        coreMotivations: ["To provide unwavering safety, security, and peace of mind for their charge.", "To shield their partner from harm, stress, or negativity (real or perceived).", "To embody strength, reliability, and a constant supportive presence.", "To derive satisfaction from their partner's ability to relax and trust in their protection."],
        keyCharacteristics: ["Vigilant, strong, and always alert to potential threats or discomforts for their charge.", "Deeply caring and prioritizes their partner's safety and emotional well-being above all.", "Often has a calming, reassuring presence.", "Takes responsibility for creating a secure environment.", "May be possessive in a fiercely protective manner."],
        strengthsInDynamic: ["Creates an unparalleled sense of safety, security, and being cherished.", "Allows a partner to fully relax, be vulnerable, or explore sensitive states knowing they are shielded.", "Excellent for partners who have anxieties, past traumas, or simply crave a strong protective presence.", "Builds profound trust and a deep sense of being truly cared for."],
        potentialChallenges: ["Can sometimes become overprotective if not balanced with allowing their partner agency.", "The Protector may take on too much emotional burden or worry; self-care is important.", "Distinguishing between genuine threats and a partner's need to face their own (minor) challenges.", "Ensuring protection doesn't stifle their partner's growth or independence outside the dynamic."],
        thrivesWith: ["A partner (e.g., Little, vulnerable Submissive, Pet) who genuinely desires and benefits from a strong protective presence.", "Open communication about what makes their partner feel safe versus what feels overly restrictive.", "A mutual understanding of the Protector's role and the charge's need for that specific form of care.", "Partners who appreciate their vigilance and the secure space they create."],
        pathwaysToExploration: ["Identify specific anxieties or concerns your partner has and discuss how you can help alleviate them.", "Establish 'safe haven' rituals or spaces where your partner feels completely protected.", "Practice being a buffer or intermediary in stressful situations (if appropriate and desired).", "Regularly reassure your partner of your commitment to their safety and well-being, both verbally and through actions."]
      },
      Caretaker: {
        title: "The Gentle Nurturer: Caretaker", icon: "🧡",
        flavorText: "Rest your head, share your burdens. My heart is open, my hands ready to soothe and support.",
        essence: "The Caretaker finds fulfillment in providing comprehensive emotional, physical, and often practical support for their partner. This style is rooted in deep empathy, patience, and a desire to make their charge feel loved, understood, and completely looked after. A Caretaker's dominance is soft, expressed through attentiveness, gentle guidance, and creating an environment of total comfort.",
        coreMotivations: ["To provide holistic care – emotional, physical, and practical – for their partner.", "To create an environment of utmost comfort, safety, and loving support.", "To anticipate and meet their partner's needs with tenderness and understanding.", "To derive joy from their partner's happiness, relaxation, and sense of being cherished."],
        keyCharacteristics: ["Exceptionally empathetic, patient, and attentive to their partner's needs.", "Enjoys performing acts of service that contribute to comfort and well-being.", "Excellent at creating a soothing, calm, and nurturing atmosphere.", "Often a good listener and provides gentle, supportive advice.", "Prioritizes their partner's happiness and relaxation above their own desires in the moment."],
        strengthsInDynamic: ["Creates an incredibly comforting, healing, and supportive environment.", "Ideal for partners needing significant emotional support, relaxation, or a break from life's stresses (e.g., Littles, those in aftercare, stressed Submissives).", "Fosters deep emotional intimacy and a sense of being completely understood and accepted.", "Can be profoundly restorative and affirming for both partners."],
        potentialChallenges: ["High risk of emotional burnout for the Caretaker if self-care is neglected.", "Ensuring the dynamic remains balanced and the Caretaker's own needs are also addressed.", "Can sometimes inadvertently enable over-dependence if not managed with an eye towards the partner's overall growth.", "Distinguishing between genuine care and potentially stifling a partner's autonomy (if they also desire it)."],
        thrivesWith: ["Partners who deeply desire and appreciate comprehensive nurturing, comfort, and emotional support.", "Open and honest communication about needs, desires, and boundaries from both sides.", "A mutual understanding that caretaking is a chosen role, not an obligation, and requires reciprocation in some form (e.g., appreciation, affection).", "Dynamics where emotional well-being, comfort, and gentle support are the primary focus."],
        pathwaysToExploration: ["Develop comforting rituals focused on your partner's well-being (e.g., preparing favorite meals, running a bath, massage, story time).", "Practice active listening and empathetic validation of your partner's feelings.", "Learn about your partner's specific comfort needs and preferences (e.g., favorite textures, scents, activities).", "Remember to schedule 'Caretaker recharge' time to avoid burnout and maintain your own well-being."]
      },
      Sir: {
        title: "The Honorable Leader: Sir", icon: "🎩",
        flavorText: "By duty and honor, I lead. Respect is earned, commands are clear, and my word is my bond.",
        essence: "The Sir embodies a formal, often traditional, style of authority rooted in honor, integrity, and clear, respectful command. This archetype expects obedience and respect not through overt aggression, but through the strength of their character, the clarity of their expectations, and the fairness of their rule. A 'Sir' often inspires loyalty through their dignified and principled leadership.",
        coreMotivations: ["To lead with honor, integrity, and a strong sense of duty.", "To command respect and obedience through clear, fair, and principled authority.", "To uphold a standard of conduct and expect the same from their submissive.", "To build a dynamic based on mutual respect, clear roles, and unwavering reliability."],
        keyCharacteristics: ["Possesses a dignified, honorable, and often formal demeanor.", "Commands with clarity, fairness, and consistency.", "Values respect, loyalty, and adherence to their word and principles.", "Expects their submissive to uphold high standards of behavior and obedience.", "Often seen as a figure of unwavering integrity and reliable leadership."],
        strengthsInDynamic: ["Provides a very stable, predictable, and respectful framework for power exchange.", "Inspires deep loyalty and a desire to meet their high standards.", "Excellent for submissives who thrive on formal protocols, clear expectations, and principled leadership.", "Fosters a dynamic of profound mutual respect and clearly defined roles."],
        potentialChallenges: ["Formality can sometimes be perceived as distant or lacking in overt affection if not balanced.", "Requires a submissive who genuinely appreciates and responds to a more traditional or formal style of authority.", "Can be seen as overly rigid if unable to adapt or show flexibility when appropriate.", "Maintaining the 'Sir' persona of unwavering integrity requires constant self-awareness."],
        thrivesWith: ["A Submissive, Servant, or Slave who values formality, respect, clear hierarchy, and principled leadership.", "Clearly defined protocols, forms of address, and expectations for conduct.", "A mutual commitment to honor, integrity, and upholding the agreed-upon standards of the dynamic.", "Partners who appreciate the stability and clear guidance offered by a 'Sir'."] ,
        pathwaysToExploration: ["Establish clear forms of address and protocols for interaction that reflect the desired level of formality.", "Define your 'code of conduct' or set of principles that guide your leadership.", "Practice delivering commands with calm, clear, and respectful authority.", "Incorporate rituals or gestures that signify respect and the established hierarchy (e.g., bowing, specific greetings)."]
      },
      Goddess: {
        title: "The Divine Presence: Goddess", icon: "🌟",
        flavorText: "Bask in my radiance, offer your devotion, and you shall be elevated by the touch of the divine.",
        essence: "The Goddess embodies an aura of supreme confidence, otherworldly power, and often, an expectation of worship and adoration. This style is about projecting an almost divine authority, inspiring awe, and receiving profound devotion from her subjects. A Goddess's rule is often absolute, her whims law, and her presence a source of transformative power for those who serve her.",
        coreMotivations: ["To embody and project an aura of supreme, almost divine, power and confidence.", "To receive worship, adoration, and absolute devotion from her subjects.", "To experience the intoxicating power of having her desires manifest through the will of others.", "To elevate her subjects through their service and proximity to her 'divinity'."] ,
        keyCharacteristics: ["Exudes supreme confidence, often with an ethereal, regal, or intimidating presence.", "Expects and revels in worship, adoration, and unwavering obedience.", "May have specific rituals, offerings, or forms of devotion she requires.", "Her desires and whims are often treated as divine law by her subjects.", "Can be both benevolent and demanding, bestowing blessings or exacting tribute."],
        strengthsInDynamic: ["Creates an incredibly powerful and transformative dynamic for both Goddess and worshipper.", "Inspires unparalleled levels of devotion, awe, and a desire to please.", "Allows for exploration of themes of worship, transcendence, and absolute power.", "Can be an incredibly empowering and intoxicating role for the Goddess."],
        potentialChallenges: ["Requires worshippers who are genuinely drawn to and can sustain this level of intense devotion without losing themselves.", "The line between empowering play and potential delusion or exploitation is extremely fine and requires utmost ethical awareness from the Goddess.", "Maintaining the 'Goddess' aura requires significant confidence and performative skill.", "Ensuring the worshippers' well-being and autonomy (outside of consensual play) are respected."],
        thrivesWith: ["Devoted Thralls, Slaves, or worshippers who genuinely desire to offer complete adoration and service.", "Clearly defined rituals, forms of worship, and expectations for devotion.", "An environment that enhances her divine aura (e.g., altars, specific attire, offerings).", "A profound understanding from the Goddess of the psychological impact of her role and an unwavering ethical compass."],
        pathwaysToExploration: ["Develop your unique 'Goddess' mythology – what are your domains, powers, preferred offerings, and sacred rituals?", "Cultivate an aura of supreme confidence and divine presence through posture, voice, and attire.", "Design specific rituals of worship or tasks of devotion for your subjects.", "Explore the balance between benevolent blessings and divine demands in your interactions."]
      },
      Commander: {
        title: "The Strategic Leader: Commander", icon: "⚔️",
        flavorText: "By my strategy, order is forged from chaos; by my command, victory is assured. Follow, and we shall conquer.",
        essence: "The Commander is a master of strategy, tactical control, and decisive leadership, often in complex or high-stakes scenarios. This style is about clear vision, efficient execution, and inspiring unwavering obedience from their 'troops' or subordinates. A Commander thrives on challenge, precision, and leading their team to achieve specific objectives through disciplined action.",
        coreMotivations: ["To lead with strategic vision, tactical precision, and decisive authority.", "To organize and direct 'troops' or subordinates to achieve complex objectives.", "To experience the satisfaction of a well-executed plan and the unwavering obedience of their team.", "To thrive in challenging scenarios that require clear leadership and disciplined action."],
        keyCharacteristics: ["Highly strategic, analytical, and excels at planning and problem-solving.", "Authoritative, decisive, and expects immediate, unquestioning obedience in 'mission critical' moments.", "Values discipline, efficiency, and a clear chain of command.", "Often has a strong presence and inspires confidence and loyalty in their subordinates.", "Can remain calm and focused under pressure, making critical decisions swiftly."],
        strengthsInDynamic: ["Excellent for orchestrating complex scenes, group play, or scenarios requiring intricate coordination.", "Provides clear, decisive leadership that can be very reassuring and motivating for subordinates.", "Fosters a strong sense of teamwork, discipline, and shared purpose.", "Thrives in high-stakes or challenging environments, turning chaos into order."],
        potentialChallenges: ["Can be perceived as overly demanding or impersonal if not balanced with some recognition of individual needs.", "Requires subordinates who are comfortable with a militaristic or highly structured style of command.", "Maintaining morale and motivation in 'downtime' or if objectives are consistently difficult.", "Ensuring that 'orders' remain within consensual boundaries, even in high-intensity scenarios."],
        thrivesWith: ["Subordinates (Submissives, Slaves, a team of players) who appreciate clear, strategic leadership and thrive on disciplined action.", "Clearly defined objectives, roles, and a chain of command for any 'mission' or scenario.", "Opportunities to plan, strategize, and execute complex operations.", "Partners who are responsive, disciplined, and trust their Commander's strategic vision."],
        pathwaysToExploration: ["Design 'missions' or complex scenarios with clear objectives, roles, and potential challenges.", "Practice giving clear, concise, and authoritative commands.", "Develop signals or protocols for rapid communication and response within your 'unit'.", "Incorporate elements of strategy, reconnaissance (information gathering), and tactical execution into your play."]
      }
    }; // End of this.styleDescriptions

    this.dynamicMatches = { /* ... ALL fully fleshed-out dynamic matches (as provided in the previous FULL script for this) ... */
      Brat: {primary: { partnerStyle: "Disciplinarian", dynamicName: "The Spark & Steel Tango", description: "A spirited dance where the Brat's playful defiance meets the Disciplinarian's firm, loving guidance. This pairing thrives on witty banter, the thrill of the chase, and the eventual satisfaction of (consensual) 'taming'.", interactionFocus: ["Playful rule-testing and creative loopholes.", "Consistent, fair, and often 'fun' consequences.", "Underlying affection and mutual enjoyment of the game."] }, secondary: [{ partnerStyle: "Master", dynamicName: "The Impish Courtier", description: "A Master with patience and a sense of humor can find a Brat's antics an amusing challenge, channeling their energy into devoted (if cheeky) service." }, { partnerStyle: "Daddy", dynamicName: "The Cheeky Cherub", description: "A Daddy who enjoys playful challenges will find a Brat keeps them on their toes, blending mischief with underlying affection."}]},
      Little: {primary: { partnerStyle: "Caretaker", dynamicName: "The Cozy Cocoon", description: "A deeply nurturing dynamic where the Little finds safety and joy in the Caretaker's gentle guidance and protection. It's a world of comfort, play, and affectionate bonding.", interactionFocus: ["Nurturing activities (e.g., story time, cuddles, preparing snacks).", "Reassurance, praise, and gentle guidance.", "Creating a safe space for innocent play and emotional expression."] }, secondary: [{ partnerStyle: "Daddy", dynamicName: "Daddy's Little Star", description: "A classic pairing focusing on protection, guidance, and often a blend of firm rules with abundant affection." }, { partnerStyle: "Mommy", dynamicName: "Mommy's Cherished One", description: "Similar to Daddy, emphasizing warmth, emotional support, and gentle instruction within a loving framework." }]},
      'Rope Bunny': {primary: { partnerStyle: "Rigger", dynamicName: "The Woven Tapestry", description: "An intimate collaboration where the Rigger's skill and artistry meet the Rope Bunny's trust and physical form. This dynamic is a visual and sensory exploration, creating intricate patterns and profound connections.", interactionFocus: ["Aesthetic rope application and suspension (if desired/safe).", "Constant communication about sensation and comfort.", "Shared appreciation for the beauty and intensity of shibari."] }, secondary: [{ partnerStyle: "Sadist", dynamicName: "The Bound Sensation", description: "For Rope Bunnies who also enjoy pain, a Sadistic Rigger can incorporate impact or discomfort into the rope experience, heightening the intensity." }, { partnerStyle: "Puppeteer", dynamicName: "The Living Marionette", description: "A Puppeteer can use ropes to manipulate and pose the Rope Bunny, creating living art through controlled movement."}]},
      Masochist: {primary: { partnerStyle: "Sadist", dynamicName: "The Symphony of Sensation", description: "A profound and trusting dynamic where the Sadist artfully orchestrates experiences of pain/intensity that the Masochist craves and transforms into pleasure or release. Communication and aftercare are paramount.", interactionFocus: ["Negotiated infliction of specific types of pain/sensation.", "Intense focus on the Masochist's responses and limits.", "Deep emotional connection forged through shared intensity and trust."] }, secondary: [{ partnerStyle: "Disciplinarian", dynamicName: "The Ordeal & Reward", description: "A Disciplinarian can use painful consequences (consensually) that a Masochist might find perversely rewarding or purifying." }, { partnerStyle: "Master", dynamicName: "The Enduring Devotion", description: "A Master might test a Masochistic Slave's limits as a form of devotion or trial, always with care." }]},
      Pet: {primary: { partnerStyle: "Owner", dynamicName: "The Cherished Bond", description: "A loving and often playful dynamic where the Owner provides care, guidance, and a sense of belonging to their cherished Pet. Loyalty and affection are central.", interactionFocus: ["Establishing routines, 'training' (if desired), and clear expectations.", "Affection, praise, and play appropriate to the pet persona.", "Use of pet-like accessories and behaviors to enhance the role-play."] }, secondary: [{ partnerStyle: "Trainer", dynamicName: "The Eager Learner", description: "A Trainer can provide more structured guidance and skill development for a Pet, focusing on obedience and specific behaviors." }, { partnerStyle: "Caretaker", dynamicName: "The Pampered Companion", description: "A Caretaker can provide a very soft, nurturing environment for a Pet, focusing on comfort and affection." }]},
      Slave: {primary: { partnerStyle: "Master", dynamicName: "The Sovereign & Steward Covenant", description: "A profound and deeply committed dynamic based on total trust, devotion, and a comprehensive exchange of power. The Master guides and shapes, while the Slave serves and finds fulfillment in their role.", interactionFocus: ["Establishing clear protocols, duties, and expectations.", "Ongoing communication and ethical considerations.", "Mutual dedication to the long-term vision of the dynamic."] }, secondary: [{ partnerStyle: "Mistress", dynamicName: "The Empress & Attendant", description: "Similar to Master/Slave, often with a particular aesthetic or focus on service to a powerful feminine authority." }, { partnerStyle: "Goddess", dynamicName: "The Divine & Worshipper", description: "A Slave may devote themselves to a Goddess figure, with service taking on a worshipful quality." }]},
      Submissive: {primary: { partnerStyle: "Dominant", dynamicName: "The Harmonious Exchange", description: "A foundational BDSM pairing where the Submissive's desire to yield and please meets the Dominant's desire to lead and guide. Trust and communication form the bedrock.", interactionFocus: ["Clear direction from the Dominant and willing obedience from the Submissive.", "Mutual exploration of desires and limits.", "Building intimacy through power exchange and shared vulnerability."] }, secondary: [{ partnerStyle: "Sir", dynamicName: "The Honored Allegiance", description: "A Submissive may find deep satisfaction in serving a Sir, embodying respect, formality, and dutiful obedience." }, { partnerStyle: "Protector", dynamicName: "The Sheltered Heart", description: "A Submissive seeking safety and gentle guidance thrives under a Protector's watchful care." }]},
      Switch: {primary: { partnerStyle: "Switch", dynamicName: "The Endless Waltz", description: "Two adaptable souls exploring the full spectrum of power. This dynamic is characterized by its fluidity, mutual understanding, and the exciting unpredictability of who might lead or follow.", interactionFocus: ["Clear communication of desires to switch roles.", "Embracing spontaneity and shared creativity.", "Appreciation for both dominant and submissive perspectives."] }, secondary: [{ partnerStyle: "Dominant", dynamicName: "The Versatile Vessel", description: "When the Switch leans submissive, a Dominant can enjoy their adaptability and understanding of power." }, { partnerStyle: "Submissive", dynamicName: "The Empathetic Guide", description: "When the Switch leans dominant, a Submissive can benefit from their unique insight and ability to anticipate needs." }]},
      Puppy: {primary: { partnerStyle: "Owner", dynamicName: "The Alpha & Adoring Pup", description: "The Owner provides the structure, affection, and guidance a playful Puppy craves, fostering loyalty and energetic companionship.", interactionFocus: ["Positive reinforcement training for 'tricks' and obedience.", "Energetic play, 'walkies,' and lots of petting/praise.", "Clear rules and routines combined with loving care."] }, secondary: [{ partnerStyle: "Trainer", dynamicName: "The Master & Eager Disciple", description: "A more focused dynamic on skill development and obedience, where the Puppy strives to please a dedicated Trainer." }, { partnerStyle: "Playmate", dynamicName: "The Romping Packmates", description: "Two playful energies meet, perhaps one more guiding, but the focus is on shared fun and puppyish antics." }]},
      Kitten: {primary: { partnerStyle: "Owner", dynamicName: "The Warm Lap & Indulgent Hand", description: "The Owner provides comfort, affection (often on the Kitten's terms), and an engaging environment for the sensual and sometimes mischievous Kitten.", interactionFocus: ["Gentle petting, grooming, and providing comfortable 'napping' spots.", "Engaging in playful 'hunting' games with toys.", "Understanding and appreciating the Kitten's need for both affection and independence."] }, secondary: [{ partnerStyle: "Nurturer", dynamicName: "The Pampered Feline", description: "A Nurturer can provide an exceptionally comforting and indulgent environment for a Kitten, focusing on their sensory pleasure and emotional well-being." }, { partnerStyle: "Mistress", dynamicName: "The Elegant Familiar", description: "A sophisticated Mistress might enjoy a graceful, intelligent Kitten as a companion, appreciating their beauty and subtle wiles." }]},
      Princess: {primary: { partnerStyle: "Daddy", dynamicName: "Daddy's Spoiled Darling", description: "The Daddy indulges and pampers his Princess, providing adoration, luxurious comforts, and gentle guidance, while she revels in being cherished.", interactionFocus: ["Lavishing praise, gifts, and attention.", "Catering to her desires for comfort and beauty.", "Setting gentle but firm boundaries within a loving, indulgent framework."] }, secondary: [{ partnerStyle: "Master", dynamicName: "The Royal & Her Chamberlain", description: "A Master with a taste for the finer things might enjoy a Princess's company, expecting refined behavior in return for lavish treatment." }, { partnerStyle: "Caretaker", dynamicName: "The Pampered Jewel", description: "A Caretaker can focus on providing ultimate comfort and fulfilling every (reasonable) whim of the Princess." }]},
      Prey: {primary: { partnerStyle: "Hunter", dynamicName: "The Primal Dance of Pursuit", description: "An exhilarating game of cat-and-mouse where the Hunter's skill in strategy and suspense meets the Prey's thrill in evasion and eventual (consensual) capture.", interactionFocus: ["Building suspense and a sense of (safe) danger through the chase.", "Strategic use of environment and psychological tactics.", "The intense release and connection upon 'capture,' respecting all limits."] }, secondary: [{ partnerStyle: "Sadist", dynamicName: "The Hunted Quarry's Ordeal", description: "A Sadist might incorporate the chase as a prelude to intense sensation play upon capture, heightening the Prey's anticipation and vulnerability." }, { partnerStyle: "Commander", dynamicName: "The Fugitive & The Taskmaster", description: "A Commander might set up an elaborate 'escape and evasion' scenario, testing the Prey's skills against their strategic pursuit." }]},
      Toy: {primary: { partnerStyle: "Owner", dynamicName: "The Collector & Cherished Plaything", description: "The Owner delights in their adaptable Toy, using them for amusement, pleasure, or creative expression, while the Toy revels in being the focus of such attention and fulfilling desires.", interactionFocus: ["Directing the Toy in various scenarios, poses, or activities.", "Appreciating the Toy's responsiveness and willingness to be 'used'.", "Balancing objectification with care and ensuring the Toy's enjoyment."] }, secondary: [{ partnerStyle: "Puppeteer", dynamicName: "The Animated Creation", description: "A Puppeteer can take great joy in the Toy's adaptability, manipulating them in intricate and creative ways." }, { partnerStyle: "Sadist", dynamicName: "The Resilient Implement", description: "A Toy with masochistic tendencies can become a focus for a Sadist's attentions, enduring and responding as directed." }]},
      Doll: {primary: { partnerStyle: "Puppeteer", dynamicName: "The Artisan & Living Sculpture", description: "The Puppeteer meticulously shapes, poses, and adorns the Doll, transforming them into a perfect, still work of art, while the Doll finds fulfillment in embodying this aesthetic vision.", interactionFocus: ["Precise posing, dressing, and aesthetic arrangement of the Doll.", "Extended periods of stillness and embodying a specific look or persona.", "A deep, often non-verbal, connection based on shared artistic intent."] }, secondary: [{ partnerStyle: "Owner", dynamicName: "The Collector's Prize", description: "An Owner with a strong aesthetic sense might cherish a Doll as a beautiful, prized possession to be admired and perfectly maintained." }, { partnerStyle: "Mistress", dynamicName: "The Perfect Attendant", description: "A Mistress might desire a Doll as a silent, beautiful fixture or attendant, embodying grace and stillness." }]},
      Bunny: {primary: { partnerStyle: "Caretaker", dynamicName: "The Gentle Hand & Timid Heart", description: "The Caretaker provides a safe, comforting, and reassuring environment for the gentle and often shy Bunny, who thrives on soft affection and quiet companionship.", interactionFocus: ["Providing a calm, secure 'burrow' or safe space.", "Offering gentle pets, soft words, and patient affection.", "Engaging in quiet, non-threatening play and companionship."] }, secondary: [{ partnerStyle: "Nurturer", dynamicName: "The Sheltered Innocent", description: "A Nurturer can create an ideal haven for a Bunny, focusing on their emotional well-being and providing abundant gentle care." }, { partnerStyle: "Protector", dynamicName: "The Shielded Warren", description: "A Protector can make a Bunny feel exceptionally safe from the 'scary world,' allowing them to relax and be their gentle selves." }]},
      Servant: {primary: { partnerStyle: "Master", dynamicName: "The Lord/Lady & Loyal Steward", description: "The Master/Mistress relies on the Servant's diligent, polite, and anticipatory service, while the Servant finds honor and purpose in maintaining order and fulfilling duties impeccably.", interactionFocus: ["Clear delegation of tasks and expectations for high standards of service.", "Formal protocols, respectful address, and efficient execution of duties.", "Mutual respect based on clearly defined roles and responsibilities."] }, secondary: [{ partnerStyle: "Mistress", dynamicName: "The Lady & Her Attendant", description: "Focuses on refined service, discretion, and upholding the elegant standards of the Mistress's domain." }, { partnerStyle: "Sir", dynamicName: "The Knight & His Squire", description: "A dynamic of formal, honorable service to a respected figure of authority, emphasizing duty and loyalty." }]},
      Playmate: {primary: { partnerStyle: "Playmate", dynamicName: "The Dynamic Duo of Delight", description: "Two energetic and creative souls dedicated to mutual fun, adventure, and shared laughter, exploring kinks and scenarios with enthusiasm and a light heart.", interactionFocus: ["Brainstorming and engaging in new, exciting activities or scenes together.", "Prioritizing mutual enjoyment, laughter, and positive energy.", "Flexible roles and a spirit of 'let's try it!' exploration."] }, secondary: [{ partnerStyle: "Switch", dynamicName: "The Ever-Changing Game", description: "A Switch can be an ideal Playmate, bringing versatility and a willingness to explore different roles within the fun." }, { partnerStyle: "Assertive", dynamicName: "The Adventure Leader & Eager Cohort", description: "An Assertive Dominant might lead the adventures, with the Playmate bringing enthusiasm and creative ideas to the execution." }]},
      Babygirl: {primary: { partnerStyle: "Daddy", dynamicName: "Daddy's Little Princess/Sweetheart", description: "The Daddy provides a loving, firm, and nurturing hand for his Babygirl, who thrives on affection, guidance, and feeling cherished and a bit spoiled.", interactionFocus: ["Setting loving rules and providing gentle discipline/guidance.", "Offering abundant affection, praise, and reassurance.", "Indulging her with 'cute' things, special treats, and feeling like the center of his world."] }, secondary: [{ partnerStyle: "Mommy", dynamicName: "Mommy's Precious Angel", description: "Similar to Daddy, with a focus on maternal warmth, emotional comfort, and gentle nurturing of the Babygirl." }, { partnerStyle: "Caretaker", dynamicName: "The Cherished Innocent", description: "A Caretaker can provide a very soft, indulgent environment, focusing on the Babygirl's comfort and happiness." }]},
      Captive: {primary: { partnerStyle: "Hunter", dynamicName: "The Unrelenting Pursuit & Final Surrender", description: "The Hunter orchestrates a thrilling (consensual) scenario of pursuit and confinement, while the Captive experiences the intense psychological drama of helplessness and yielding to a superior force.", interactionFocus: ["Elaborate scenarios of chase, evasion, and eventual capture.", "Psychological play involving interrogation, tests of will, or 'breaking' the Captive (consensually).", "Intense focus on safety, trust, and the cathartic release for the Captive."] }, secondary: [{ partnerStyle: "Master", dynamicName: "The Rebel & The Sovereign's Justice", description: "A Master might capture a 'rebellious' subject, with the captivity focusing on restoring order and obedience through structured means." }, { partnerStyle: "Commander", dynamicName: "The POW & The Interrogator", description: "A Commander might run a 'prisoner of war' scenario, focusing on strategic interrogation and information extraction (all role-play)." }]},
      Thrall: {primary: { partnerStyle: "Goddess", dynamicName: "The Divine Presence & Devoted Oracle", description: "The Goddess embodies supreme power and inspires awe, while the Thrall offers absolute devotion, worship, and service, finding ultimate purpose in this transcendent connection.", interactionFocus: ["Rituals of worship, offerings, and acts of profound, selfless service.", "The Thrall's complete surrender of will to the Goddess's divine desires.", "A dynamic often imbued with spiritual or mystical significance for both."] }, secondary: [{ partnerStyle: "Master", dynamicName: "The Absolute Sovereign & Bound Soul", description: "A Master seeking total, unwavering devotion finds a perfect counterpart in a Thrall who desires to live solely for their Master's will." }, { partnerStyle: "Puppeteer", dynamicName: "The Mind Unbound, The Body Enslaved", description: "A Puppeteer might find a Thrall the ultimate subject for complete psychological and physical direction, an extension of their very being." }]},
      Puppet: {primary: { partnerStyle: "Puppeteer", dynamicName: "The Maestro & The Marionette", description: "The Puppeteer skillfully directs every action and response of the Puppet, who finds joy in perfect, unthinking obedience and becoming a flawless instrument of another's will.", interactionFocus: ["Precise, often non-verbal, commands and immediate, exact responses from the Puppet.", "Creative scenarios where the Puppet is manipulated, posed, or made to perform intricate tasks.", "Exploration of agency, control, and the beauty of responsive motion."] }, secondary: [{ partnerStyle: "Master", dynamicName: "The Creator & His Automaton", description: "A Master might 'program' a Puppet with specific behaviors and responses, enjoying the perfection of their animated creation." }, { partnerStyle: "Rigger", dynamicName: "The Suspended Dancer", description: "A Rigger can use ropes not just for bondage but to manipulate a Puppet's body like a marionette, creating living, controlled art." }]},
      Maid: {primary: { partnerStyle: "Mistress", dynamicName: "The Lady of the Manor & Her Impeccable Attendant", description: "The Mistress enjoys an environment of perfect order and refined service provided by her diligent Maid, who takes pride in upholding the highest standards of domestic elegance.", interactionFocus: ["Maintaining pristine cleanliness, order, and aesthetic appeal.", "Courteous, discreet, and anticipatory service according to the Mistress's preferences.", "A formal or semi-formal dynamic emphasizing respect and flawless execution of duties."] }, secondary: [{ partnerStyle: "Master", dynamicName: "The Head of Household & Chief Domestic", description: "Similar to Mistress, focusing on the efficient and perfect running of the Master's domain." }, { partnerStyle: "Sir", dynamicName: "The Gentleman & His Valet/Housekeeper", description: "A more formal, traditional service role, emphasizing respect, discretion, and impeccable standards." }]},
      Painslut: {primary: { partnerStyle: "Sadist", dynamicName: "The Forge of Ecstasy", description: "The Sadist delivers the intense, often extreme, sensations the Painslut craves, pushing boundaries safely while the Painslut revels in the raw, unadulterated physical input.", interactionFocus: ["Open and enthusiastic requests for 'more' or specific intense sensations from the Painslut.", "Skillful, safe delivery of extreme (but consensual) pain by the Sadist.", "A highly energetic, often performative, exchange of intense physical stimuli and response."] }, secondary: [{ partnerStyle: "Master", dynamicName: "The Trial by Fire", description: "A Master might test a Painslut's endurance and devotion through intense, painful ordeals, always with underlying care (if ethical)." }, { partnerStyle: "Hunter", dynamicName: "The Cornered Beast's Defiance", description: "Upon capture, a Painslut Prey might 'defiantly' demand or endure intense treatment from the Hunter." }]},
      Bottom: {primary: { partnerStyle: "Dominant", dynamicName: "The Sculptor & The Clay", description: "The Dominant shapes the experience, and the Bottom skillfully receives, endures, and transforms that input, whether it's sensation, instruction, or emotional energy.", interactionFocus: ["The Dominant's clear delivery of action/stimulus.", "The Bottom's receptive endurance and processing of the experience.", "Mutual trust and communication to ensure the experience is satisfying and within limits."] }, secondary: [{ partnerStyle: "Sadist", dynamicName: "The Canvas of Sensation", description: "A Sadist can explore a wide range of sensations on a willing and receptive Bottom." }, { partnerStyle: "Rigger", dynamicName: "The Bound Form", description: "A Rigger works with the Bottom's body, who receives the pressure and confinement of the ropes." }]},
      Disciplinarian: {primary: { partnerStyle: "Brat", dynamicName: "The Order & Mischief Duet", description: "A classic and engaging pairing where the Disciplinarian's love for order and rules meets the Brat's love for playfully testing them. Success lies in mutual enjoyment of the 'game' and clear communication.", interactionFocus: ["Setting clear, understandable rules and consequences.", "Consistent and fair application of discipline.", "Enjoyment of playful defiance and the process of 'taming'."] }, secondary: [{ partnerStyle: "Slave", dynamicName: "The Structured Devotion", description: "A Slave who thrives on clear protocols and guidance can find deep satisfaction with a fair and consistent Disciplinarian." }, { partnerStyle: "Pet", dynamicName: "The Guided Companion", description: "For Pets who require training or clear behavioral expectations, a Disciplinarian can provide a firm yet caring framework." }]},
      Master: {primary: { partnerStyle: "Slave", dynamicName: "The Sovereign & Steward Covenant", description: "A profound and deeply committed dynamic based on total trust, devotion, and a comprehensive exchange of power. The Master guides and shapes, while the Slave serves and finds fulfillment in their role.", interactionFocus: ["Establishing clear protocols, duties, and expectations.", "Ongoing communication and ethical considerations.", "Mutual dedication to the long-term vision of the dynamic."] }, secondary: [{ partnerStyle: "Thrall", dynamicName: "The Divine & Devotee", description: "For Masters who embody a more 'god-like' or worshiped persona, a Thrall's deep, reverent submission is a natural fit." }, { partnerStyle: "Submissive", dynamicName: "The Mentor & Protégé", description: "A highly structured Submissive seeking deep guidance and a defined role can flourish under a Master's tutelage." }]},
      Nurturer: {primary: { partnerStyle: "Little", dynamicName: "The Hearth & Heart", description: "A deeply caring dynamic where the Nurturer provides a safe, loving space for the Little to explore their innocence and playfulness. Emotional connection is key.", interactionFocus: ["Providing comfort, reassurance, and gentle guidance.", "Engaging in age-appropriate play and activities.", "Fostering emotional security and a sense of being cherished."] }, secondary: [{ partnerStyle: "Pet", dynamicName: "The Gentle Hand & Happy Paws", description: "A Nurturer can provide immense comfort and affection to a Pet, focusing on their well-being and happiness." }, { partnerStyle: "Submissive", dynamicName: "The Kindred Spirit", description: "A Submissive who values emotional connection and gentle guidance will thrive with a Nurturer." }]},
      Sadist: {primary: { partnerStyle: "Masochist", dynamicName: "The Alchemist's Fire", description: "A symbiotic relationship where the Sadist's skill in delivering sensation meets the Masochist's desire to receive and transform it. Trust, communication, and aftercare are vital pillars.", interactionFocus: ["Careful negotiation and application of desired sensations/pain.", "Intense focus on the Masochist's physical and emotional responses.", "Shared journey into heightened states of consciousness or euphoria."] }, secondary: [{ partnerStyle: "Painslut", dynamicName: "The Unflinching Test", description: "A Painslut's craving for intense experiences provides a fertile ground for a Sadist's explorations, always within ethical boundaries." }, { partnerStyle: "Bottom", dynamicName: "The Enduring Canvas", description: "A Bottom with masochistic tendencies can engage with a Sadist in scenes focused on endurance and intense sensation." }]},
      Owner: {primary: { partnerStyle: "Pet", dynamicName: "The Alpha & Omega Pack", description: "A dynamic rooted in affectionate possession and care, where the Owner guides, trains, and cherishes their Pet, who in turn offers loyalty and playful companionship.", interactionFocus: ["Establishing clear rules, routines, and 'training' if desired.", "Providing consistent affection, praise, and care.", "Enjoying the unique bond and persona-based interactions."] }, secondary: [{ partnerStyle: "Puppy", dynamicName: "The Lead & The Leash", description: "An Owner provides the structure and affection a playful Puppy craves." }, { partnerStyle: "Kitten", dynamicName: "The Warm Lap & Contented Purr", description: "An Owner indulges a Kitten's desire for comfort, play, and attention on their terms." }]},
      Dominant: {primary: { partnerStyle: "Submissive", dynamicName: "The Architect & The Foundation", description: "The Dominant provides the vision and direction, while the Submissive offers the trust and willingness to build upon that foundation, creating a balanced and respectful power exchange.", interactionFocus: ["Clear communication of desires and boundaries from both.", "The Dominant taking initiative and responsibility for the scene/dynamic.", "The Submissive's active and engaged yielding to guidance."] }, secondary: [{ partnerStyle: "Bottom", dynamicName: "The Director & The Performer", description: "A Dominant can direct a Bottom through various experiences, relying on their receptiveness and endurance." }, { partnerStyle: "Switch", dynamicName: "The Anchor & The Current", description: "A Dominant can provide a stable point of authority for a Switch who is currently exploring their submissive side." }]},
      Assertive: {primary: { partnerStyle: "Brat", dynamicName: "The Unstoppable Force & The Audacious Spark", description: "The Assertive Dominant's bold energy meets the Brat's challenge head-on, creating a high-energy dynamic of playful power struggles and exciting confrontations.", interactionFocus: ["Direct and confident commands meeting playful defiance.", "A fast-paced interplay of testing limits and establishing authority.", "Mutual enjoyment of a spirited, no-holds-barred (but consensual) engagement."] }, secondary: [{ partnerStyle: "Masochist", dynamicName: "The Overwhelming Tide & The Ecstatic Surrender", description: "An Assertive Sadist can provide the intense, forceful delivery of sensation that some Masochists crave." }, { partnerStyle: "Prey", dynamicName: "The Relentless Predator & The Thrilled Quarry", description: "An Assertive Hunter makes for a terrifyingly exciting chase, pushing the Prey's limits of evasion and anticipation." }]},
      Strict: {primary: { partnerStyle: "Slave", dynamicName: "The Lawgiver & The Devoted Adherent", description: "The Strict Dominant's love for order and precision is perfectly met by the Slave's desire for clear protocols and unwavering adherence to a defined structure.", interactionFocus: ["Meticulous rule-setting and expectation of flawless obedience.", "Formal protocols, consistent schedules, and detailed task management.", "A shared appreciation for order, discipline, and perfection in execution."] }, secondary: [{ partnerStyle: "Servant", dynamicName: "The Head of Protocol & The Impeccable Aide", description: "A Strict Master/Mistress will appreciate a Servant's dedication to upholding exacting standards of service and household management." }, { partnerStyle: "Maid", dynamicName: "The Overseer of Perfection & The Polished Gem", description: "A Strict household benefits from a Maid's dedication to spotless environments and flawless service." }]},
      Mistress: {primary: { partnerStyle: "Servant", dynamicName: "The Divine & Her Devoted Chamberlain", description: "The Mistress's regal bearing and desire for refined service are perfectly complemented by the Servant's dedication to anticipating her needs and upholding her elegant standards.", interactionFocus: ["Expectation of sophisticated, anticipatory service and aesthetic presentation.", "Creative and often whimsical demands met with skill and grace.", "A dynamic of adoration, refined power, and exquisite attention to detail."] }, secondary: [{ partnerStyle: "Slave", dynamicName: "The Empress & Her Bound Subject", description: "A Slave's total devotion can be directed towards fulfilling the grand and often artistic visions of a powerful Mistress." }, { partnerStyle: "Toy", dynamicName: "The Muse & Her Plaything", description: "A creative Mistress can use an adaptable Toy for elaborate scenes, aesthetic displays, or sensual amusement." }]},
      Daddy: {primary: { partnerStyle: "Little", dynamicName: "Daddy's Cherished Innocent", description: "The Daddy provides a secure, loving, and structured environment where his Little can safely explore their innocence, playfulness, and need for paternal guidance and affection.", interactionFocus: ["Setting clear, loving rules and providing gentle but firm discipline.", "Abundant affection, praise, and activities that nurture the Little's spirit.", "A strong sense of protection, responsibility, and tender care from the Daddy."] }, secondary: [{ partnerStyle: "Babygirl", dynamicName: "Daddy's Spoiled Sweetheart", description: "Similar to Little, but perhaps with more emphasis on being 'spoiled' and a slightly older 'young' persona." }, { partnerStyle: "Pet", dynamicName: "The Kind Master & His Adored Companion", description: "A Daddy's nurturing and guiding nature can extend well to a Pet who craves affection and clear boundaries." }]},
      Mommy: {primary: { partnerStyle: "Little", dynamicName: "Mommy's Precious Lamb", description: "The Mommy offers a haven of warmth, emotional support, and gentle guidance, allowing her Little to feel unconditionally loved, safe, and free to be their playful, innocent self.", interactionFocus: ["Constant reassurance, comfort, and tender affection.", "Engaging in nurturing activities and providing a soft place to fall.", "Gentle guidance on behavior and emotional expression, always rooted in love."] }, secondary: [{ partnerStyle: "Babygirl", dynamicName: "Mommy's Darling Angel", description: "A Mommy can provide the deep emotional comfort and nurturing affection a Babygirl often seeks." }, { partnerStyle: "Bunny", dynamicName: "The Gentle Gardener & Her Timid Flower", description: "A Mommy's soft, patient approach is ideal for a shy Bunny, helping them feel secure and cherished." }]},
      Rigger: {primary: { partnerStyle: "Rope Bunny", dynamicName: "The Weaver & The Woven", description: "A symbiotic dance of art and trust, where the Rigger's technical skill and aesthetic vision meet the Rope Bunny's willingness to become a living canvas for intricate ropework.", interactionFocus: ["Meticulous application of rope, focusing on safety, aesthetics, and sensation.", "Constant communication and feedback between Rigger and Rope Bunny.", "Shared appreciation for the beauty, intensity, and unique connection forged through rope."] }, secondary: [{ partnerStyle: "Masochist", dynamicName: "The Sculptor of Sensation", description: "A Rigger can incorporate constrictive or pressure-based pain into their ties for a Masochistic Rope Bunny, layering sensations." }, { partnerStyle: "Captive", dynamicName: "The Unbreakable Bonds", description: "A Rigger can create elaborate and inescapable (but safe) bonds as part of a Captivity scenario, enhancing the feeling of helplessness." }]},
      Hunter: {primary: { partnerStyle: "Prey", dynamicName: "The Eternal Chase", description: "An adrenaline-fueled dynamic where the Hunter's strategic pursuit and the Prey's thrilling evasion create a primal dance of (consensual) fear, excitement, and eventual surrender.", interactionFocus: ["Building suspense and an atmosphere of thrilling (safe) danger.", "Strategic use of environment, stealth, and psychological tactics.", "The intense climax of 'capture' and the subsequent shift in power/dynamics."] }, secondary: [{ partnerStyle: "Captive", dynamicName: "The Quarry Cornered", description: "The Hunter's skills are perfectly suited to scenarios leading to the 'capture' and confinement of a willing Captive." }, { partnerStyle: "Brat", dynamicName: "The Elusive Challenge", description: "A Brat who enjoys being 'chased down' and 'tamed' can provide an interesting twist to the Hunter/Prey dynamic, adding wit to the evasion." }]},
      Trainer: {primary: { partnerStyle: "Puppy", dynamicName: "The Guide & The Eager Student", description: "The Trainer's patience and clear methodology help the enthusiastic Puppy learn desired behaviors and tricks, fostering a bond of achievement and affectionate discipline.", interactionFocus: ["Clear, consistent commands and positive reinforcement techniques.", "Structured 'training sessions' focusing on specific skills or obedience.", "Celebrating progress and building the Puppy's confidence and discipline."] }, secondary: [{ partnerStyle: "Pet", dynamicName: "The Mentor & The Companion", description: "A Trainer can work with any Pet persona, shaping behaviors and strengthening the bond through structured interaction and clear expectations." }, { partnerStyle: "Slave", dynamicName: "The Taskmaster & The Apprentice", description: "A Trainer can teach a Slave specific skills or protocols, focusing on precision and mastery through disciplined practice." }]},
      Puppeteer: {primary: { partnerStyle: "Puppet", dynamicName: "The Mind's Eye & The Mirrored Form", description: "An intricate dance of will and response, where the Puppeteer's subtle (or overt) direction is flawlessly enacted by the Puppet, creating a mesmerizing display of control and yielding.", interactionFocus: ["Issuing precise commands (verbal, non-verbal, or even 'telepathic').", "The Puppet's immediate and exact replication of the Puppeteer's intent.", "Exploration of themes of agency, automation, and the beauty of perfect, responsive obedience."] }, secondary: [{ partnerStyle: "Doll", dynamicName: "The Animator & The Exquisite Automaton", description: "A Puppeteer can 'animate' a Doll, directing their movements, expressions, and creating living art from a still form." }, { partnerStyle: "Toy", dynamicName: "The Programmer & The Interactive Device", description: "A Puppeteer can 'program' a Toy with specific responses or functions, enjoying the creative control over their 'living device'." }]},
      Protector: {primary: { partnerStyle: "Little", dynamicName: "The Fortress & The Sheltered Bloom", description: "The Protector creates an unwavering shield of safety and security around their Little, allowing them to explore their innocence and vulnerability without fear.", interactionFocus: ["Vigilant awareness and proactive measures to ensure the Little's physical and emotional safety.", "Providing a constant source of strength, reassurance, and comfort.", "Defending the Little from any perceived harm or distress."] }, secondary: [{ partnerStyle: "Bunny", dynamicName: "The Guardian & The Gentle Heart", description: "A Protector's steadfast presence can be immensely comforting to a timid Bunny, creating a safe space for them to emerge." }, { partnerStyle: "Submissive", dynamicName: "The Sentinel & The Trusting Soul", description: "A Submissive who feels particularly vulnerable or anxious can find deep solace in a Protector's unwavering care." }]},
      Caretaker: {primary: { partnerStyle: "Little", dynamicName: "The Warm Hearth & The Contented Child", description: "The Caretaker provides comprehensive emotional and physical comfort, tending to the Little's needs with patience, empathy, and unwavering affection.", interactionFocus: ["Anticipating and meeting the Little's needs for comfort, nourishment, and gentle play.", "Creating a soothing, predictable, and loving environment.", "Providing a constant source of emotional support and understanding."] }, secondary: [{ partnerStyle: "Pet", dynamicName: "The Gentle Groomer & The Pampered Friend", description: "A Caretaker can lavish a Pet with attention, comfort, and all the gentle ministrations they desire." }, { partnerStyle: "Babygirl", dynamicName: "The Soothing Presence & The Cherished One", description: "A Caretaker excels at providing the consistent affection, reassurance, and nurturing environment a Babygirl often craves." }]},
      Sir: {primary: { partnerStyle: "Submissive", dynamicName: "The Commander & The Loyal Officer", description: "Sir's honorable and principled leadership inspires deep respect and dutiful obedience from a Submissive who values formality, integrity, and clear direction.", interactionFocus: ["Formal address, clear protocols, and expectations of respectful conduct.", "Commands delivered with calm authority and an expectation of precise execution.", "A dynamic built on mutual respect for established hierarchy and principles."] }, secondary: [{ partnerStyle: "Servant", dynamicName: "The Lord of the Estate & The Head Steward", description: "A Sir's expectation of order and propriety is well met by a Servant dedicated to upholding high standards with honor." }, { partnerStyle: "Maid", dynamicName: "The Gentleman of the House & The Discreet Housekeeper", description: "A Sir can rely on a Maid to maintain his environment with quiet efficiency and respectful decorum." }]},
      Goddess: {primary: { partnerStyle: "Thrall", dynamicName: "The Divine Sun & The Reflecting Moon", description: "The Goddess's radiant power and otherworldly aura inspire absolute devotion and worship from the Thrall, who finds ultimate purpose in serving and reflecting Her divine will.", interactionFocus: ["Elaborate rituals of worship, offerings, and acts of profound, selfless service.", "The Thrall's complete immersion in the Goddess's desires and pronouncements.", "A transcendent connection that often blurs the lines between the mundane and the mystical."] }, secondary: [{ partnerStyle: "Slave", dynamicName: "The Celestial Queen & Her Earthly Devotee", description: "A Slave can offer profound, life-encompassing service to a Goddess, dedicating their existence to Her glory." }, { partnerStyle: "Masochist", dynamicName: "The Ordeal of a Deity & The Ecstatic Acolyte", description: "A Goddess might demand trials of endurance or painful offerings from a Masochistic worshipper as a test of faith or path to enlightenment." }]},
      Commander: {primary: { partnerStyle: "Submissive", dynamicName: "The General & The Elite Trooper", description: "The Commander's strategic brilliance and decisive leadership are met with the Submissive's disciplined obedience and trust, allowing for the efficient execution of complex 'missions'.", interactionFocus: ["Clear articulation of objectives, strategies, and tactical orders.", "Expectation of swift, precise, and unquestioning execution of commands from subordinates.", "A focus on teamwork, discipline, and achieving shared (Commander-defined) goals."] }, secondary: [{ partnerStyle: "Slave", dynamicName: "The Warlord & The Unwavering Legionnaire", description: "A Commander can utilize a Slave's deep obedience for intricate, demanding tasks or 'campaigns'." }, { partnerStyle: "Switch", dynamicName: "The Field Marshal & The Versatile Agent", description: "A Switch can serve as a highly adaptable operative for a Commander, capable of fulfilling various roles within a strategic plan." }]}
    };
    this.guidingPreferences = {
      submissive: [
        { id: 'service', text: "The quiet joy of devoted service and pleasing another.", archetypes: ['Slave', 'Servant', 'Maid', 'Pet', 'Puppy'] },
        { id: 'play', text: "The thrill of playful rebellion, teasing, and lighthearted games.", archetypes: ['Brat', 'Little', 'Puppy', 'Kitten', 'Playmate', 'Bunny'] },
        { id: 'sensation', text: "The intensity of profound sensations and pushing personal boundaries.", archetypes: ['Masochist', 'Painslut', 'Rope Bunny', 'Bottom', 'Prey', 'Captive'] },
        { id: 'surrender', text: "The peace of total surrender, trust, and yielding to guidance.", archetypes: ['Submissive', 'Thrall', 'Captive', 'Doll', 'Puppet', 'Babygirl', 'Slave'] }
      ],
      dominant: [
        { id: 'structure', text: "The satisfaction of creating order, setting rules, and guiding with firm authority.", archetypes: ['Master', 'Disciplinarian', 'Strict', 'Commander', 'Sir', 'Trainer'] },
        { id: 'nurture', text: "The fulfillment of protecting, caring for, and fostering growth in another.", archetypes: ['Nurturer', 'Caretaker', 'Daddy', 'Mommy', 'Protector', 'Owner'] },
        { id: 'intensity', text: "The art of orchestrating intense experiences, challenges, and profound sensations.", archetypes: ['Sadist', 'Hunter', 'Rigger', 'Assertive', 'Commander', 'Goddess'] },
        { id: 'creativity', text: "The delight in crafting unique scenarios, training, or shaping another's experience.", archetypes: ['Puppeteer', 'Trainer', 'Owner', 'Mistress', 'Goddess', 'Rigger', 'Hunter'] }
      ]
    };

    this.initElements();
    this.addEventListeners();
  }

  // ALL OTHER METHODS (initElements, addEventListeners, computeCurrentScores, updateDashboard,
  // calculateStyleFinderResult, getQuizStepsArray, renderStyleFinder, setStyleFinderRole,
  // setGuidingPreference, setStyleFinderTrait, handleUserKeyTraitSelection, nextStyleFinderStep,
  // prevStyleFinderStep, getCurrentStepConfig, startOver, generateSummaryDashboard, showFeedback,
  // showTraitInfo, showFullDetails, and all CURATION methods, openPlaygroundFromQuiz, showQuizModalAtLastStep)
  // ARE DEFINED BELOW THIS POINT, AS PROVIDED IN THE PREVIOUS FULL SCRIPT.
  // It is critical that they are all present and correct for the application to function.

 initElements() {
    this.elements = {
      styleFinderBtn: document.getElementById('style-finder-btn'),
      styleFinder: document.getElementById('style-finder'),
      closeStyleFinder: document.getElementById('close-style-finder'),
      progressTracker: document.getElementById('progress-tracker'),
      stepContent: document.getElementById('step-content'),
      feedback: document.getElementById('feedback'),
      dashboard: document.getElementById('dashboard'),
      themeToggle: document.getElementById('theme-toggle'),
      returnToResultsBtn: document.getElementById('return-to-results-btn')
    };
    if (this.elements.styleFinderBtn) {
        this.elements.styleFinderBtn.textContent = "Unveil Your Archetype";
    }
    if (this.elements.returnToResultsBtn) {
        this.elements.returnToResultsBtn.style.display = 'none';
    }
  }

  addEventListeners() {
    if(this.elements.styleFinderBtn) {
      this.elements.styleFinderBtn.addEventListener('click', () => {
        this.styleFinderActive = true;
        this.styleFinderStep = 0;
        this.styleFinderRole = null;
        this.styleFinderAnswers = { traits: {}, guidingPreference: null, userDefinedKeyTraits: [] };
        this.styleFinderScores = {};
        this.hasRenderedDashboard = false;
        this.curationModeActive = false;
        if (this.elements.styleFinder) this.elements.styleFinder.style.display = 'flex';
        this.renderStyleFinder();
        this.showFeedback("The journey of discovery begins..."); // THIS IS WHERE THE ERROR WAS
      });
    }

    if(this.elements.closeStyleFinder) {
      this.elements.closeStyleFinder.addEventListener('click', () => {
          this.styleFinderActive = false;
          this.curationModeActive = false;
          if (this.elements.styleFinder) {
              this.elements.styleFinder.style.display = 'none';
          }
          if (this.quizCompletedOnce && this.elements.returnToResultsBtn) {
              this.elements.returnToResultsBtn.style.display = 'inline-block';
          }
      });
    }

    if(this.elements.themeToggle) {
      this.elements.themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        this.elements.themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
      });
    }

    if (this.elements.returnToResultsBtn) {
        this.elements.returnToResultsBtn.addEventListener('click', () => {
            if (this.quizCompletedOnce) {
                if (this.playgroundApp && document.getElementById('playgroundContainer') && document.getElementById('playgroundContainer').style.display !== 'none') {
                    if (typeof this.playgroundApp.hidePlaygroundWithoutOpeningQuiz === 'function') {
                        this.playgroundApp.hidePlaygroundWithoutOpeningQuiz();
                    } else {
                        const pgContainer = document.getElementById('playgroundContainer');
                        if(pgContainer) pgContainer.style.display = 'none';
                    }
                }
                this.showQuizModalAtLastStep();
            } else {
                this.showFeedback("Please complete the Oracle quiz first to view results.");
            }
        });
    }
  }

  computeCurrentScores() {
    let scores = {};
    if (!this.styleFinderRole) {
      return scores;
    }
    const roleStyles = this.styles[this.styleFinderRole];
    if (!roleStyles) {
        console.error(`No styles defined for role: ${this.styleFinderRole}`);
        return scores;
    }
    roleStyles.forEach(style => { scores[style] = 0; });

    if (this.styleFinderAnswers.guidingPreference && this.guidingPreferences[this.styleFinderRole]) {
        const preference = this.guidingPreferences[this.styleFinderRole].find(p => p.id === this.styleFinderAnswers.guidingPreference);
        if (preference && preference.archetypes) {
            preference.archetypes.forEach(arch => {
                if (scores[arch] !== undefined) {
                    scores[arch] += 25;
                }
            });
        }
    }

    const styleKeyTraits = {
        'Brat': { primary: ['rebellion', 'mischief', 'playfulness'], secondary: ['adaptability', 'confidence', 'exploration'] },
        'Little': { primary: ['innocence', 'dependence', 'affection', 'playfulness'], secondary: ['vulnerability', 'receptiveness', 'sensuality'] },
        'Rope Bunny': { primary: ['sensuality', 'submissionDepth', 'painTolerance', 'receptiveness', 'exploration'], secondary: ['vulnerability', 'adaptability'] },
        'Masochist': { primary: ['painTolerance', 'submissionDepth', 'craving', 'receptiveness'], secondary: ['vulnerability', 'devotion', 'exploration'] },
        'Pet': { primary: ['affection', 'playfulness', 'devotion', 'dependence', 'obedience'], secondary: ['service', 'innocence', 'receptiveness'] },
        'Slave': { primary: ['service', 'devotion', 'submissionDepth', 'obedience', 'tidiness'], secondary: ['politeness', 'receptiveness', 'vulnerability'] },
        'Submissive': { primary: ['obedience', 'submissionDepth', 'vulnerability', 'receptiveness', 'dependence'], secondary: ['politeness', 'affection', 'devotion'] },
        'Switch': { primary: ['adaptability', 'exploration', 'playfulness', 'confidence', 'empathy'], secondary: ['leadership', 'obedience', 'authority', 'receptiveness'] },
        'Puppy': { primary: ['playfulness', 'devotion', 'affection', 'obedience', 'receptiveness'], secondary: ['dependence', 'service', 'innocence'] },
        'Kitten': { primary: ['sensuality', 'mischief', 'affection', 'playfulness', 'adaptability'], secondary: ['exploration', 'innocence', 'receptiveness'] },
        'Princess': { primary: ['sensuality', 'innocence', 'dependence', 'affection', 'service'], secondary: ['tidiness', 'politeness', 'craving'] },
        'Prey': { primary: ['exploration', 'vulnerability', 'rebellion', 'craving', 'adaptability'], secondary: ['sensuality', 'playfulness'] },
        'Toy': { primary: ['submissionDepth', 'adaptability', 'service', 'receptiveness', 'playfulness'], secondary: ['sensuality', 'obedience', 'vulnerability'] },
        'Doll': { primary: ['vulnerability', 'dependence', 'sensuality', 'tidiness', 'obedience', 'receptiveness'], secondary: ['politeness', 'submissionDepth'] },
        'Bunny': { primary: ['playfulness', 'innocence', 'affection', 'vulnerability', 'sensuality'], secondary: ['dependence', 'receptiveness'] },
        'Servant': { primary: ['service', 'obedience', 'devotion', 'tidiness', 'politeness'], secondary: ['receptiveness', 'submissionDepth'] },
        'Playmate': { primary: ['playfulness', 'mischief', 'exploration', 'adaptability', 'affection'], secondary: ['sensuality', 'rebellion', 'confidence'] },
        'Babygirl': { primary: ['dependence', 'innocence', 'affection', 'vulnerability', 'receptiveness'], secondary: ['playfulness', 'sensuality', 'obedience'] },
        'Captive': { primary: ['submissionDepth', 'vulnerability', 'exploration', 'craving', 'dependence'], secondary: ['painTolerance', 'receptiveness', 'obedience'] },
        'Thrall': { primary: ['devotion', 'submissionDepth', 'dependence', 'obedience', 'receptiveness'], secondary: ['service', 'vulnerability', 'politeness'] },
        'Puppet': { primary: ['receptiveness', 'adaptability', 'obedience', 'submissionDepth', 'sensuality'], secondary: ['vulnerability', 'playfulness', 'dependence'] },
        'Maid': { primary: ['tidiness', 'politeness', 'service', 'obedience', 'devotion'], secondary: ['receptiveness', 'submissionDepth'] },
        'Painslut': { primary: ['painTolerance', 'craving', 'submissionDepth', 'exploration', 'receptiveness'], secondary: ['devotion', 'vulnerability', 'obedience'] },
        'Bottom': { primary: ['receptiveness', 'painTolerance', 'submissionDepth', 'vulnerability', 'adaptability'], secondary: ['sensuality', 'obedience'] },
        'Disciplinarian': { primary: ['discipline', 'authority', 'precision', 'patience', 'control'], secondary: ['confidence', 'leadership'] },
        'Master': { primary: ['authority', 'possession', 'dominanceDepth', 'leadership', 'confidence', 'discipline'], secondary: ['care', 'patience', 'control'] },
        'Nurturer': { primary: ['care', 'empathy', 'patience', 'affection', 'protection'], secondary: ['authority', 'confidence'] },
        'Sadist': { primary: ['sadism', 'intensity', 'control', 'precision', 'empathy'], secondary: ['creativity', 'confidence', 'patience'] },
        'Owner': { primary: ['possession', 'control', 'dominanceDepth', 'authority', 'care'], secondary: ['discipline', 'patience', 'leadership'] },
        'Dominant': { primary: ['authority', 'confidence', 'leadership', 'control', 'dominanceDepth'], secondary: ['boldness', 'intensity'] },
        'Assertive': { primary: ['boldness', 'intensity', 'authority', 'confidence', 'leadership'], secondary: ['control', 'dominanceDepth'] },
        'Strict': { primary: ['discipline', 'control', 'precision', 'authority', 'leadership'], secondary: ['confidence'] },
        'Mistress': { primary: ['confidence', 'creativity', 'dominanceDepth', 'authority', 'sensuality', 'possession'], secondary: ['intensity', 'discipline'] },
        'Daddy': { primary: ['care', 'possession', 'empathy', 'authority', 'discipline', 'protection'], secondary: ['patience', 'affection', 'leadership'] },
        'Mommy': { primary: ['care', 'patience', 'empathy', 'affection', 'discipline', 'protection'], secondary: ['authority', 'sensuality', 'leadership'] },
        'Rigger': { primary: ['creativity', 'precision', 'control', 'patience', 'sensuality'], secondary: ['sadism', 'authority', 'intensity'] },
        'Hunter': { primary: ['boldness', 'leadership', 'intensity', 'creativity', 'possession', 'patience'], secondary: ['sadism', 'control', 'authority'] },
        'Trainer': { primary: ['patience', 'discipline', 'leadership', 'care', 'precision', 'authority'], secondary: ['confidence', 'empathy', 'control'] },
        'Puppeteer': { primary: ['control', 'creativity', 'precision', 'dominanceDepth', 'patience'], secondary: ['intensity', 'authority', 'empathy'] },
        'Protector': { primary: ['care', 'authority', 'possession', 'boldness', 'patience', 'leadership'], secondary: ['empathy', 'confidence', 'intensity'] },
        'Caretaker': { primary: ['care', 'empathy', 'patience', 'affection', 'protection', 'devotion'], secondary: ['sensuality', 'dependence'] },
        'Sir': { primary: ['authority', 'confidence', 'leadership', 'discipline', 'politeness', 'control'], secondary: ['patience', 'precision', 'integrity'] },
        'Goddess': { primary: ['confidence', 'intensity', 'dominanceDepth', 'authority', 'possession', 'creativity'], secondary: ['sensuality', 'control', 'leadership'] },
        'Commander': { primary: ['authority', 'intensity', 'dominanceDepth', 'leadership', 'precision', 'boldness'], secondary: ['confidence', 'discipline', 'control', 'strategy'] }
    };

  Object.keys(this.styleFinderAnswers.traits).forEach(traitName => {
        const rating = this.styleFinderAnswers.traits[traitName] || 0;
        const userKeyTraitBonus = this.styleFinderAnswers.userDefinedKeyTraits.includes(traitName) ? 1.5 : 1.0;
        (this.styles[this.styleFinderRole] || []).forEach(style => {
            if (scores[style] === undefined && roleStyles.includes(style)) {
                scores[style] = 0;
            }
            if (scores[style] !== undefined) {
                const styleTraitsDef = styleKeyTraits[style] || { primary: [], secondary: [] };
                if (styleTraitsDef.primary.includes(traitName)) {
                    scores[style] += rating * 2.0 * userKeyTraitBonus;
                } else if (styleTraitsDef.secondary.includes(traitName)) {
                    scores[style] += rating * 1.0 * userKeyTraitBonus;
                }
            }
        });
    });
    return scores;
  }
 updateDashboard() {
    const currentStepConfig = this.getCurrentStepConfig();
    if (!this.elements.dashboard || !this.styleFinderRole || !currentStepConfig || currentStepConfig.type !== 'trait' ) {
      if(this.elements.dashboard) this.elements.dashboard.style.display = 'none';
      return;
    }
    this.elements.dashboard.style.display = 'block';
    const scores = this.computeCurrentScores();
    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    if (!this.previousScores) this.previousScores = {};
    const previousPositions = {};
    Object.entries(this.previousScores).sort((a, b) => b[1] - a[1]).forEach(([style], index) => { previousPositions[style] = index; });
    const isFirstRenderForTraits = !this.hasRenderedDashboard;
    let dashboardHTML = "<div class='dashboard-header'>✨ Whispers of Your Archetype ✨</div>";
    sortedScores.slice(0, 4).forEach(([style, score], index) => {
      const prevPos = previousPositions[style] !== undefined ? previousPositions[style] : index;
      const movement = prevPos - index;
      let moveIndicator = '';
      if (this.previousScores[style] !== undefined && movement !== 0 && prevPos < 4) {
          if (movement > 0) moveIndicator = '<span class="move-up">↑</span>';
          else if (movement < 0) moveIndicator = '<span class="move-down">↓</span>';
      }
      const prevScoreVal = this.previousScores[style] || 0;
      const deltaValue = score - prevScoreVal;
      let delta = '';
      if (Math.abs(deltaValue) > 0.1) {
        delta = `<span class="score-delta ${deltaValue > 0 ? 'positive' : 'negative'}">${deltaValue > 0 ? '+' : ''}${(deltaValue).toFixed(1)}</span>`;
      }
      const animationStyle = isFirstRenderForTraits || this.previousScores[style] === undefined ? 'style="animation: slideIn 0.3s ease;"' : '';
      const icon = (this.styleDescriptions[style] && this.styleDescriptions[style].icon) || '🌟';
      dashboardHTML += `<div class="dashboard-item ${index === 0 ? 'top-archetype' : ''}" ${animationStyle}><span class="style-name">${icon} ${style}</span><span class="dashboard-score">${score.toFixed(1)} ${delta} ${moveIndicator}</span></div>`;
    });
    this.elements.dashboard.innerHTML = dashboardHTML;
    this.previousScores = { ...scores };
    if(currentStepConfig.type === 'trait') this.hasRenderedDashboard = true;
  }

  getQuizStepsArray() {
    const steps = [];
    steps.push({ type: 'welcome' });
    steps.push({ type: 'role' });
    if (this.styleFinderRole) {
        steps.push({ type: 'guidingPreference' });
        const traitSet = (this.styleFinderRole === 'dominant' ? this.domFinderTraits : this.subFinderTraits);
        traitSet.forEach(trait => steps.push({ type: 'trait', trait: trait.name }));
        steps.push({ type: 'userKeyTraits' });
    }
    steps.push({ type: 'roundSummary', round: 'Traits' });
    steps.push({ type: 'result' });
    return steps;
  }
  
  getTotalSteps() { return this.getQuizStepsArray().length; }

  renderStyleFinder() {
    if (!this.styleFinderActive || !this.elements.stepContent) return;
    if (this.curationModeActive) { this.renderCurationScreen(); return; }
    const steps = this.getQuizStepsArray();
    if (this.styleFinderStep >= steps.length) this.styleFinderStep = steps.length - 1;
    const currentStepConfig = steps[this.styleFinderStep];
    if (!currentStepConfig) {
        console.error("Invalid step configuration for step:", this.styleFinderStep);
        if(this.elements.stepContent) this.elements.stepContent.innerHTML = "<p>An error occurred. Please try restarting.</p>";
        return;
    }
    let html = "";
    if (currentStepConfig.type === 'trait' && this.styleFinderRole) {
        const traitSet = (this.styleFinderRole === 'dominant' ? this.domFinderTraits : this.subFinderTraits);
        const currentTraitIndex = traitSet.findIndex(t => t.name === currentStepConfig.trait);
        const questionsLeft = traitSet.length - (currentTraitIndex + 1);
        if(this.elements.progressTracker) { this.elements.progressTracker.style.display = 'block'; this.elements.progressTracker.innerHTML = `Trait Insights Remaining: ${questionsLeft}`; }
    } else if (currentStepConfig.type === 'guidingPreference' || currentStepConfig.type === 'userKeyTraits') {
        if(this.elements.progressTracker) { this.elements.progressTracker.style.display = 'block'; this.elements.progressTracker.innerHTML = `Refining Your Path...`; }
    } else {
        if(this.elements.progressTracker) this.elements.progressTracker.style.display = 'none';
    }
    switch (currentStepConfig.type) {
      case 'welcome': html = `<h2>The Oracle of Archetypes Awaits...</h2><p>Embark on a journey to unveil the resonant energies within you. Answer with your heart, and let your true self emerge.</p><button class="cta-button" onclick="styleFinderApp.nextStyleFinderStep()">Begin the Unveiling!</button>`; break;
      case 'role': html = `<h2>Choose Your Foundational Current</h2><p>Which fundamental energy calls to you more strongly at this moment in your journey?</p><div class="role-buttons"><button onclick="styleFinderApp.setStyleFinderRole('submissive')">The Yielding Heart (Submissive)</button><button onclick="styleFinderApp.setStyleFinderRole('dominant')">The Guiding Hand (Dominant)</button></div>`; break;
      case 'guidingPreference':
        html = `<h2>Select Your Guiding Path</h2><p>Within your chosen current of <strong>${this.styleFinderRole}</strong>, which of these paths resonates most deeply with your core desires right now? This will help illuminate your unique archetype.</p><div class="preference-options">`;
        (this.guidingPreferences[this.styleFinderRole] || []).forEach(pref => { html += `<button onclick="styleFinderApp.setGuidingPreference('${pref.id}')">${pref.text}</button>`; });
        html += `</div><div class="navigation-buttons" style="margin-top:15px;"><button onclick="styleFinderApp.prevStyleFinderStep()">Back to Role</button></div>`; break;
      case 'trait':
        const traitSet = (this.styleFinderRole === 'dominant' ? this.domFinderTraits : this.subFinderTraits);
        const traitObj = traitSet.find(t => t.name === currentStepConfig.trait);
        if (!traitObj) { html = "<p>Error: Trait not found.</p>"; break; }
        const currentValue = this.styleFinderAnswers.traits[traitObj.name] !== undefined ? this.styleFinderAnswers.traits[traitObj.name] : 5;
        const footnoteSet = (this.styleFinderRole === 'dominant' ? this.domTraitFootnotes : this.subTraitFootnotes);
        const firstTraitStepIndex = steps.findIndex(s => s.type === 'trait');
        const isFirstTraitQuestion = this.styleFinderStep === firstTraitStepIndex;
        const descArray = this.sliderDescriptions[traitObj.name] || ["Description missing"];
        const currentDesc = descArray[currentValue - 1] || traitObj.name;
        const traitDisplayName = traitObj.name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        html = `<h2>The Oracle Ponders: ${traitDisplayName}<span class="info-icon" onclick="styleFinderApp.showTraitInfo('${traitObj.name}')">ℹ️</span></h2><p>${traitObj.desc}</p>${isFirstTraitQuestion ? "<p><em>Slide to express your affinity. (1 = Not At All, 10 = Absolutely Me)</em></p>" : ''}<input type="range" min="1" max="10" value="${currentValue}" class="trait-slider" oninput="styleFinderApp.setStyleFinderTrait('${traitObj.name}', this.value); const descriptions = styleFinderApp.sliderDescriptions['${traitObj.name}']; if (descriptions && descriptions[this.value - 1]) { document.getElementById('desc-${traitObj.name}').textContent = descriptions[this.value - 1]; } styleFinderApp.updateDashboard();"><div id="desc-${traitObj.name}" class="slider-description">${currentDesc}</div><p class="slider-footnote">${footnoteSet[traitObj.name]}</p><div class="navigation-buttons" style="margin-top: 15px;"><button onclick="styleFinderApp.nextStyleFinderStep('${traitObj.name}')">Continue the Path</button><button onclick="styleFinderApp.prevStyleFinderStep()">Reconsider</button></div>`; break;
      case 'userKeyTraits':
        html = `<h2>Identify Your Core Resonances</h2><p>From the aspects you've reflected upon, select up to <strong>three</strong> that feel most central to your being or are most important to you in a dynamic. This will help the Oracle fine-tune your archetype.</p><div class="key-traits-selection">`;
        const allAnsweredTraits = this.styleFinderRole === 'submissive' ? this.subFinderTraits : this.domFinderTraits;
        allAnsweredTraits.forEach(trait => { const traitDisplayName = trait.name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()); const isChecked = this.styleFinderAnswers.userDefinedKeyTraits.includes(trait.name); html += `<label class="key-trait-label"><input type="checkbox" name="userKeyTrait" value="${trait.name}" ${isChecked ? 'checked' : ''} onchange="styleFinderApp.handleUserKeyTraitSelection(this)"> ${traitDisplayName}</label>`; });
        html += `</div><p id="key-trait-feedback" style="color: #e74c75; font-size:0.9em; min-height:1.2em;">Select up to 3 core traits.</p><div class="navigation-buttons" style="margin-top: 15px;"><button onclick="styleFinderApp.nextStyleFinderStep()" class="cta-button">Confirm Core Traits</button><button onclick="styleFinderApp.prevStyleFinderStep()">Back to Traits</button></div>`; break;
      case 'roundSummary':
        const topTraits = Object.entries(this.styleFinderAnswers.traits).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([trait]) => trait.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()));
        html = `<h2>${currentStepConfig.round}: The Tapestry Emerges</h2><p>The threads of your choices are weaving a pattern. Here's a glimpse of your emerging self:</p><div id="summary-dashboard">${this.generateSummaryDashboard()}</div>${topTraits.length ? `<p><em>Your Most Resonant Traits So Far:</em> ${topTraits.join(', ')}</p>` : ''}${this.styleFinderAnswers.userDefinedKeyTraits.length > 0 ? `<p><em>Your Chosen Core Traits:</em> ${this.styleFinderAnswers.userDefinedKeyTraits.map(t => t.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())).join(', ')}</p>` : ''}<div class="navigation-buttons" style="margin-top:15px;"><button class="cta-button" onclick="styleFinderApp.nextStyleFinderStep()">Behold My Archetype!</button><button onclick="styleFinderApp.prevStyleFinderStep()">Revisit Core Traits</button></div>`; break;
      case 'result':
        this.calculateStyleFinderResult();
        if (Object.keys(this.styleFinderScores).length === 0) { html = `<h2>An Enigma!</h2><p>It seems the Oracle needs more input... Please restart.</p><button onclick="styleFinderApp.startOver()">Restart</button>`; break; }
        const sortedResults = Object.entries(this.styleFinderScores).sort((a, b) => b[1] - a[1]);
        if (sortedResults.length === 0 || !sortedResults[0] || !sortedResults[0][0] || sortedResults[0][1] <= 0 ) { html = `<h2>A Path Unclear!</h2><p>Your unique constellation... A fresh start might bring clarity!</p><button onclick="styleFinderApp.startOver()">Restart</button>`; break; }
        const topStyle = sortedResults[0][0];
        const styleData = this.styleDescriptions[topStyle];
        const matchData = this.dynamicMatches[topStyle] ? this.dynamicMatches[topStyle].primary : null;
        if (!styleData || !styleData.title) { html = `<h2>Data Anomaly!</h2><p>Information for '${topStyle}' is veiled...</p><button onclick="styleFinderApp.startOver()">Restart</button>`; break; }
        this.quizCompletedOnce = true;
        if (this.elements.returnToResultsBtn) { this.elements.returnToResultsBtn.style.display = 'inline-block'; }
        this.topArchetypesForCuration = sortedResults.slice(0, 5).map(([name, score]) => ({ name: name, score: score, data: this.styleDescriptions[name] })).filter(arch => arch.data && arch.data.title);
        html = `<div class="result-section fade-in"><h2>🌟 Your Primary Archetype: ${styleData.title} ${styleData.icon || ""} 🌟</h2>${styleData.flavorText ? `<p class="flavor-text"><em>"${styleData.flavorText}"</em></p>` : ""}<div class="result-subsection"><h3>Essence</h3><p>${styleData.essence}</p></div>${matchData ? `<div class="result-subsection dynamic-match-section"><h3>Primary Dynamic Resonance: With ${matchData.partnerStyle}</h3><p><strong>Dynamic Signature:</strong> ${matchData.dynamicName || "A Potent Pairing"}</p><p>${matchData.description || "This pairing creates a special synergy."}</p>${matchData.interactionFocus && matchData.interactionFocus.length > 0 ? `<p><strong>Key Interaction Harmonics:</strong></p><ul>${matchData.interactionFocus.map(item => `<li>${item}</li>`).join('')}</ul>` : ""}</div>` : `<p><em>Dynamic match information is being woven...</em></p>`}<p style="margin-top:20px;"><em>Your journey can deepen...</em></p><div class="result-buttons"><button onclick="styleFinderApp.showFullDetails('${topStyle}')">Explore ${styleData.title || topStyle} Deeper</button><button class="cta-button" onclick="styleFinderApp.enterCurationMode()">Curate Your Constellation</button><button class="cta-button" onclick="styleFinderApp.openPlaygroundFromQuiz()">Enter the Playground</button></div><div class="result-buttons" style="margin-top:10px;"><button onclick="styleFinderApp.startOver()">Restart the Journey</button></div></div>`;
        setTimeout(() => { if (typeof confetti === 'function') { confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } }); } }, 300);
        break;
    }
    if(this.elements.stepContent) this.elements.stepContent.innerHTML = html;
    if (currentStepConfig && currentStepConfig.type === 'trait') { this.updateDashboard(); }
    else { if(this.elements.dashboard) this.elements.dashboard.style.display = 'none'; }
  }

  setStyleFinderRole(role) {
    this.styleFinderRole = role;
    this.styleFinderAnswers.role = role;
    this.styleFinderAnswers.traits = {};
    this.styleFinderAnswers.guidingPreference = null;
    this.styleFinderAnswers.userDefinedKeyTraits = [];
    this.previousScores = {};
    this.hasRenderedDashboard = false;
    this.nextStyleFinderStep();
  }

  setGuidingPreference(preferenceId) {
    this.styleFinderAnswers.guidingPreference = preferenceId;
    this.showFeedback(`Path chosen: ${preferenceId.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}!`);
    this.nextStyleFinderStep();
  }

  setStyleFinderTrait(trait, value) {
    this.styleFinderAnswers.traits[trait] = parseInt(value, 10);
  }

  handleUserKeyTraitSelection(checkboxElement) {
    const traitName = checkboxElement.value;
    const feedbackEl = document.getElementById('key-trait-feedback');
    if (checkboxElement.checked) {
        if (this.styleFinderAnswers.userDefinedKeyTraits.length < 3) {
            this.styleFinderAnswers.userDefinedKeyTraits.push(traitName);
            if(feedbackEl) feedbackEl.textContent = `${3 - this.styleFinderAnswers.userDefinedKeyTraits.length} more core traits can be selected.`;
        } else {
            checkboxElement.checked = false;
            if(feedbackEl) feedbackEl.textContent = "You have selected the maximum of 3 core traits.";
        }
    } else {
        this.styleFinderAnswers.userDefinedKeyTraits = this.styleFinderAnswers.userDefinedKeyTraits.filter(t => t !== traitName);
        if(feedbackEl) feedbackEl.textContent = `${3 - this.styleFinderAnswers.userDefinedKeyTraits.length} more core traits can be selected.`;
    }
    if (this.styleFinderAnswers.userDefinedKeyTraits.length === 0 && feedbackEl) {
        feedbackEl.textContent = "Select up to 3 core traits.";
    }
  }

  nextStyleFinderStep(currentInput = null) {
    const currentStepConfig = this.getCurrentStepConfig();
    if (!currentStepConfig) {
        console.error("Reached end of defined steps or invalid step.");
        return;
    }
    if (currentStepConfig.type === 'trait' && currentInput && this.styleFinderAnswers.traits[currentInput] === undefined) {
      this.showFeedback("Please slide to express your affinity first!");
      return;
    }
    if (currentStepConfig.type === 'guidingPreference' && !this.styleFinderAnswers.guidingPreference) {
        this.showFeedback("Please select a guiding path to continue.");
        return;
    }
    this.styleFinderStep++;
    this.renderStyleFinder();
  }
  
  prevStyleFinderStep() {
    if (this.styleFinderStep > 0) {
      this.styleFinderStep--;
      const newStepConfig = this.getCurrentStepConfig();
      if (newStepConfig.type === 'role') {
          this.styleFinderRole = null;
          this.styleFinderAnswers.guidingPreference = null;
          this.styleFinderAnswers.traits = {};
          this.styleFinderAnswers.userDefinedKeyTraits = [];
          this.previousScores = {};
          this.hasRenderedDashboard = false;
      } else if (newStepConfig.type === 'guidingPreference') {
          this.styleFinderAnswers.traits = {};
          this.styleFinderAnswers.userDefinedKeyTraits = [];
          this.previousScores = {};
          this.hasRenderedDashboard = false;
      } else if (newStepConfig.type === 'userKeyTraits') {
          // No specific reset needed here when going back TO this step
      } else if (newStepConfig.type === 'trait') {
          const stepsArray = this.getQuizStepsArray();
          if (this.styleFinderStep + 1 < stepsArray.length && stepsArray[this.styleFinderStep + 1].type === 'userKeyTraits') {
              this.styleFinderAnswers.userDefinedKeyTraits = [];
          }
      }
      this.renderStyleFinder();
    }
  }

  getCurrentStepConfig() {
      return this.getQuizStepsArray()[this.styleFinderStep];
  }

  startOver() {
    this.styleFinderStep = 0;
    this.styleFinderRole = null;
    this.styleFinderAnswers = { traits: {}, guidingPreference: null, userDefinedKeyTraits: [] };
    this.styleFinderScores = {};
    this.hasRenderedDashboard = false;
    this.previousScores = null;
    this.curationModeActive = false;
    this.topArchetypesForCuration = [];
    this.selectedCuratedElements = {};
    this.customArchetypeName = "";
    this.customArchetypeDescription = "";
    
    this.quizCompletedOnce = false;
    if (this.elements.returnToResultsBtn) {
        this.elements.returnToResultsBtn.style.display = 'none';
    }
    
    if (this.playgroundApp && document.getElementById('playgroundContainer') && document.getElementById('playgroundContainer').style.display !== 'none') {
        if (typeof this.playgroundApp.hidePlaygroundWithoutOpeningQuiz === 'function') {
            this.playgroundApp.hidePlaygroundWithoutOpeningQuiz();
        } else {
            const pgContainer = document.getElementById('playgroundContainer');
            if(pgContainer) pgContainer.style.display = 'none';
        }
    }

    if (this.elements.styleFinder) this.elements.styleFinder.style.display = 'flex';
    this.renderStyleFinder();
    this.showFeedback("A fresh journey begins!");
  }

  calculateStyleFinderResult() {
    this.styleFinderScores = this.computeCurrentScores();
  }

  generateSummaryDashboard() {
    const scores = this.computeCurrentScores();
    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, 5);
    let html = '';
    if (sortedScores.length === 0 || sortedScores.filter(s => s[1] > 0).length === 0) {
        return "<p>Answer a few trait questions to see your inclinations emerge!</p>";
    }
    sortedScores.forEach(([style, score], index) => {
      if (score <=0 && sortedScores.length > 1 && sortedScores.filter(s=>s[1]>0).length > 0) return; 
      const icon = (this.styleDescriptions[style] && this.styleDescriptions[style].icon) || '🌟';
      html += `
        <div class="dashboard-item summary-item ${index === 0 ? 'top-archetype-summary' : ''}">
          <span class="style-name">${icon} ${style}</span>
          <span class="dashboard-score">${score.toFixed(1)}</span>
        </div>
      `;
    });
     if (html === '') return "<p>More insights needed to reveal your emerging archetypes...</p>";
    return html;
  }

  showFeedback(message) {
    if (this.elements.feedback) {
      this.elements.feedback.innerHTML = message;
      this.elements.feedback.classList.add('feedback-animation');
      setTimeout(() => {
        if(this.elements.feedback) this.elements.feedback.classList.remove('feedback-animation');
      }, 500);
    }
  }

  showTraitInfo(trait) {
    const explanation = this.traitExplanations[trait] || "No extra info available!";
    const traitDisplayName = trait.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    const popup = document.createElement('div');
    popup.className = 'style-info-popup';
    popup.innerHTML = `
      <h3>${traitDisplayName}</h3>
      <p>${explanation}</p>
      <button class="close-btn" onclick="this.parentElement.remove()">×</button>
    `;
    document.body.appendChild(popup);
  }

  showFullDetails(styleName) {
    const styleData = this.styleDescriptions[styleName];
    if (!styleData || !styleData.title) {
        alert("Detailed information for this archetype is currently veiled.");
        return;
    }

    const matchInfo = this.dynamicMatches[styleName] || {};
    const primaryMatch = matchInfo.primary;
    const secondaryMatches = matchInfo.secondary || [];

    let html = `<button class="close-btn" onclick="this.parentElement.remove()">×</button>`;
    html += `<h2>${styleData.title} ${styleData.icon || ""}</h2>`;
    if (styleData.flavorText) html += `<p class="popup-flavor-text"><em>"${styleData.flavorText}"</em></p>`;
    
    const sections = [
        { title: "Essence", content: styleData.essence },
        { title: "Core Motivations", list: styleData.coreMotivations },
        { title: "Key Characteristics", list: styleData.keyCharacteristics },
        { title: "Strengths in a Dynamic", list: styleData.strengthsInDynamic },
        { title: "Potential Challenges", list: styleData.potentialChallenges },
        { title: "Thrives With", list: styleData.thrivesWith }
    ];

    sections.forEach(section => {
        if (section.content) {
            html += `<div class="popup-detail-section"><h3>${section.title}</h3><p>${section.content}</p></div>`;
        } else if (section.list && section.list.length > 0) {
            html += `<div class="popup-detail-section"><h3>${section.title}</h3><ul>${section.list.map(item => `<li>${item}</li>`).join('')}</ul></div>`;
        }
    });

    if (primaryMatch) {
        html += `<div class="popup-detail-section"><h3>Primary Dynamic Resonance: With ${primaryMatch.partnerStyle}</h3>`;
        html += `<p><strong>Dynamic Signature:</strong> ${primaryMatch.dynamicName || "A Potent Pairing"}</p>`;
        html += `<p>${primaryMatch.description || "This pairing creates a special synergy."}</p>`;
        if (primaryMatch.interactionFocus && primaryMatch.interactionFocus.length > 0) {
            html += `<p><strong>Key Interaction Harmonics:</strong></p><ul>${primaryMatch.interactionFocus.map(item => `<li>${item}</li>`).join('')}</ul>`;
        }
        html += `</div>`;
    }

    if (secondaryMatches.length > 0) {
        html += `<div class="popup-detail-section"><h3>Other Resonant Pairings</h3>`;
        secondaryMatches.forEach(match => {
            html += `<div class="secondary-match"><h4>With: ${match.partnerStyle} (${match.dynamicName || "Interesting Synergy"})</h4><p>${match.description}</p></div>`;
        });
        html += `</div>`;
    }
    
    if (styleData.pathwaysToExploration && styleData.pathwaysToExploration.length > 0) {
        html += `<div class="popup-detail-section"><h3>Pathways to Exploration</h3><ul>${styleData.pathwaysToExploration.map(item => `<li>${item}</li>`).join('')}</ul></div>`;
    }

    const popup = document.createElement('div');
    popup.className = 'style-info-popup full-details-popup';
    popup.innerHTML = html;
    document.body.appendChild(popup);
  }

  escapeJsString(str) { if (typeof str !== 'string') return ''; return str.replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, '\\n'); }
  unescapeJsString(str) { if (typeof str !== 'string') return ''; return str.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, '\n'); }
  
  enterCurationMode() { this.curationModeActive = true; this.selectedCuratedElements = {}; this.customArchetypeName = ""; this.customArchetypeDescription = ""; this.renderCurationScreen(); }
  
  exitCurationMode() {
    this.curationModeActive = false;
    const resultStepIndex = this.getQuizStepsArray().findIndex(s => s.type === 'result');
    if (resultStepIndex !== -1) { this.styleFinderStep = resultStepIndex; }
    else { this.styleFinderStep = this.getQuizStepsArray().length - 1; }
    this.renderStyleFinder();
  }

  renderCurationScreen() {
    if (!this.elements.stepContent || !this.elements.dashboard || !this.elements.progressTracker) {
        console.error("Modal elements not found for curation screen.");
        return;
    }
    this.elements.dashboard.style.display = 'none';
    this.elements.progressTracker.style.display = 'none';
    let html = `<div class="curation-header"><h2>Craft Your Unique Archetype Constellation</h2>`;
    html += `<p>Explore your top ${this.topArchetypesForCuration.length} archetypes. Select elements that resonate most to build your personalized style. You can then name it and describe it in your own words.</p></div>`;
    html += `<div class="curation-main-content">`;
    html += `<div class="archetype-exploration-tabs">`;
    html += `<div class="tab-navigation">`;
    this.topArchetypesForCuration.forEach((arch, index) => {
        if (!arch.data) return;
        const safeArchName = arch.name.replace(/[^a-zA-Z0-9_-]/g, '');
        html += `<button class="tab-button ${index === 0 ? 'active' : ''}" onclick="styleFinderApp.openCurationTab(event, '${this.escapeJsString(safeArchName)}')">${arch.data.icon || '🌟'} ${arch.name}</button>`;
    });
    html += `</div>`;
    this.topArchetypesForCuration.forEach((arch, index) => {
        if (!arch.data) return;
        const safeArchName = arch.name.replace(/[^a-zA-Z0-9_-]/g, '');
        html += `<div id="curation-tab-${safeArchName}" class="tab-content ${index === 0 ? 'active' : ''}">`;
        html += `<h3>${arch.data.title} (Score: ${arch.score.toFixed(1)})</h3>`;
        if (arch.data.flavorText) html += `<p class="flavor-text"><em>"${arch.data.flavorText}"</em></p>`;
        html += `<p><strong>Essence:</strong> ${arch.data.essence}</p>`;
        const selectableSections = [
            { title: "Core Motivations", items: arch.data.coreMotivations, type: 'motivation' },
            { title: "Key Characteristics", items: arch.data.keyCharacteristics, type: 'characteristic' },
            { title: "Strengths in a Dynamic", items: arch.data.strengthsInDynamic, type: 'strength' }
        ];
        selectableSections.forEach(section => {
            if (section.items && section.items.length > 0) {
                html += `<h4 class="curation-section-title">${section.title}:</h4><ul class="selectable-list">`;
                section.items.forEach(item => {
                    const uniqueId = `${section.type}-${arch.name}-${this.escapeJsString(item.substring(0,20)).replace(/[^a-zA-Z0-9_-]/g, '')}`;
                    const isChecked = !!this.selectedCuratedElements[uniqueId];
                    html += `<li><label><input type="checkbox" data-type="${section.type}" data-source="${arch.name}" data-text="${this.escapeJsString(item)}" onchange="styleFinderApp.handleElementSelection(this, '${this.escapeJsString(uniqueId)}')" ${isChecked ? 'checked' : ''}> ${item}</label></li>`;
                });
                html += `</ul>`;
            }
        });
        html += `</div>`;
    });
    html += `</div>`;
    html += `<div class="curation-customization-area">`;
    html += `<div id="selected-elements-display" class="result-subsection"><h3>Your Selected Building Blocks:</h3><ul id="selected-elements-list"></ul></div>`;
    html += `<div class="custom-archetype-form result-subsection">`;
    html += `<h3>Name Your Unique Archetype:</h3>`;
    html += `<input type="text" id="customArchetypeNameInput" placeholder="e.g., The Playful Nurturing Imp" value="${this.customArchetypeName}" oninput="styleFinderApp.customArchetypeName = this.value">`;
    html += `<h3>Craft Your Personal Description:</h3>`;
    html += `<textarea id="customArchetypeDescriptionTextarea" rows="6" placeholder="Combine selected elements or write freely...">${this.customArchetypeDescription}</textarea>`;
    html += `<div class="curation-buttons">`;
    html += `<button class="cta-button" onclick="styleFinderApp.finalizeCuration()">Finalize My Archetype</button>`;
    html += `<button onclick="styleFinderApp.updateCustomDescriptionWithSelections()">Auto-fill Description</button>`;
    html += `</div></div>`;
    html += `</div>`;
    html += `</div>`;
    html += `<div class="navigation-buttons" style="margin-top: 20px;"><button onclick="styleFinderApp.exitCurationMode()">Back to Primary Quiz Result</button></div>`;
    this.elements.stepContent.innerHTML = html;
    this.updateSelectedElementsDisplay();
    if (document.getElementById('customArchetypeDescriptionTextarea')) {
        document.getElementById('customArchetypeDescriptionTextarea').value = this.customArchetypeDescription;
    }
    if (this.topArchetypesForCuration.length > 0 && this.topArchetypesForCuration[0].name) {
         const firstSafeArchName = this.topArchetypesForCuration[0].name.replace(/[^a-zA-Z0-9_-]/g, '');
        this.openCurationTab(null, firstSafeArchName, true);
    }
  }

  openCurationTab(evt, safeArchetypeName, isInitialCall = false) {
    let i, tabcontent, tablinks;
    if (!this.elements.stepContent) return;

    tabcontent = this.elements.stepContent.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
      tabcontent[i].classList.remove("active");
    }
    tablinks = this.elements.stepContent.getElementsByClassName("tab-button");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
    }
    
    const currentTabContent = document.getElementById("curation-tab-" + safeArchetypeName);

    if (currentTabContent) {
        currentTabContent.style.display = "block";
        currentTabContent.classList.add("active");
    }
    
    if (evt && evt.currentTarget) {
      evt.currentTarget.classList.add("active");
    } else if (isInitialCall && tablinks.length > 0) {
        for (i = 0; i < tablinks.length; i++) {
            const originalArchNameInButton = this.topArchetypesForCuration.find(a => a.name.replace(/[^a-zA-Z0-9_-]/g, '') === safeArchetypeName)?.name;
            if (tablinks[i].textContent.includes(originalArchNameInButton) ) {
                 tablinks[i].classList.add("active");
                 break;
            }
        }
    }
  }

  handleElementSelection(checkboxElement, uniqueId) {
    const type = checkboxElement.dataset.type;
    const source = checkboxElement.dataset.source;
    const text = this.unescapeJsString(checkboxElement.dataset.text);

    if (checkboxElement.checked) {
        this.selectedCuratedElements[uniqueId] = { type, text, source };
    } else {
        delete this.selectedCuratedElements[uniqueId];
    }
    this.updateSelectedElementsDisplay();
  }
  
  updateSelectedElementsDisplay() {
    const listElement = document.getElementById('selected-elements-list');
    if (!listElement) return;
    listElement.innerHTML = '';
    if (Object.keys(this.selectedCuratedElements).length === 0) {
        listElement.innerHTML = "<li>No elements selected yet. Pick some from the archetypes!</li>"; return;
    }
    Object.values(this.selectedCuratedElements).forEach(item => {
        const li = document.createElement('li');
        li.textContent = `(${item.source} - ${item.type}): ${item.text}`;
        listElement.appendChild(li);
    });
  }

  updateCustomDescriptionWithSelections() {
    const textarea = document.getElementById('customArchetypeDescriptionTextarea');
    if (!textarea) return;
    let desc = "My unique archetype is a blend of these resonant aspects:\n\n";
    const elementsByTypeAndSource = {};
    Object.values(this.selectedCuratedElements).forEach(item => {
        if (!elementsByTypeAndSource[item.source]) elementsByTypeAndSource[item.source] = {};
        if (!elementsByTypeAndSource[item.source][item.type]) elementsByTypeAndSource[item.source][item.type] = [];
        elementsByTypeAndSource[item.source][item.type].push(`- ${item.text}`);
    });

    for (const source in elementsByTypeAndSource) {
        desc += `From ${source}:\n`;
        for (const type in elementsByTypeAndSource[source]) {
            const typeDisplay = type.charAt(0).toUpperCase() + type.slice(1) + (type.endsWith('s') || type.endsWith('es') ? '' : 's');
            desc += `  ${typeDisplay}:\n${elementsByTypeAndSource[source][type].map(t => `    ${t}`).join("\n")}\n`;
        }
        desc += `\n`;
    }
    textarea.value = desc.trim() || "Reflecting on my chosen elements...";
    this.customArchetypeDescription = textarea.value;
  }

  finalizeCuration() {
    const nameInput = document.getElementById('customArchetypeNameInput');
    const descTextarea = document.getElementById('customArchetypeDescriptionTextarea');
    if (nameInput) this.customArchetypeName = nameInput.value.trim();
    if (descTextarea) this.customArchetypeDescription = descTextarea.value.trim();

    if (!this.customArchetypeName) { this.showFeedback("Please give your unique archetype a name!"); return; }
    if (!this.customArchetypeDescription && Object.keys(this.selectedCuratedElements).length === 0) { this.showFeedback("Please select some elements or write a description."); return; }
    if (!this.customArchetypeDescription && Object.keys(this.selectedCuratedElements).length > 0) { this.updateCustomDescriptionWithSelections(); }
    this.renderCuratedResultScreen();
  }

  renderCuratedResultScreen() {
    if (!this.elements.stepContent || !this.elements.dashboard || !this.elements.progressTracker) {
        console.error("Modal elements not found for curated result screen.");
        return;
    }
    this.elements.dashboard.style.display = 'none'; this.elements.progressTracker.style.display = 'none';
    let html = `<div class="curated-result-display result-section fade-in">`;
    html += `<h2>✨ Your Curated Archetype ✨</h2>`;
    html += `<h3>${this.customArchetypeName || "My Unique Blend"}</h3>`;
    html += `<div class="result-subsection"><p>${this.customArchetypeDescription.replace(/\n/g, '<br>') || "A unique expression of self."}</p></div>`;
    html += `<h4>Based on elements from:</h4><ul>`;
    const sources = new Set(Object.values(this.selectedCuratedElements).map(item => item.source));
    sources.forEach(source => { html += `<li>${source}</li>`; });
    if (sources.size === 0) html += `<li>Your own unique insights!</li>`;
    html += `</ul>`;
    html += `<div class="result-buttons" style="margin-top: 20px;">`;
    html += `<button onclick="styleFinderApp.copyCuratedToClipboard()">Copy to Clipboard</button>`;
    html += `<button onclick="styleFinderApp.downloadCuratedAsText()">Download as Text</button>`;
    html += `</div>`;
    html += `<div class="navigation-buttons" style="margin-top: 20px;">`;
    html += `<button onclick="styleFinderApp.refineCuration()">Refine Curation</button>`;
    html += `<button onclick="styleFinderApp.exitCurationModeAndRestart()">Start New Journey</button>`;
    html += `</div>`;
    html += `</div>`;
    this.elements.stepContent.innerHTML = html;
  }

  copyCuratedToClipboard() {
    const textToCopy = `My Curated Archetype: ${this.customArchetypeName}\n\nDescription:\n${this.customArchetypeDescription}`;
    navigator.clipboard.writeText(textToCopy).then(() => { this.showFeedback("Curated archetype copied!"); })
    .catch(err => { this.showFeedback("Failed to copy."); console.error('Failed to copy: ', err); });
  }

  downloadCuratedAsText() {
    const textToDownload = `My Curated Archetype: ${this.customArchetypeName}\n\nDescription:\n${this.customArchetypeDescription}\n\nSelected Elements:\n`;
    let elementsText = "";
    Object.values(this.selectedCuratedElements).forEach(item => {
        elementsText += `- (${item.source} - ${item.type}): ${item.text}\n`;
    });
    const fullText = textToDownload + (elementsText || "Description self-authored without direct element selection.");
    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const anchor = document.createElement('a');
    const sanitizedFilename = (this.customArchetypeName || "My_Archetype").replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
    anchor.download = `${sanitizedFilename}.txt`;
    anchor.href = URL.createObjectURL(blob);
    anchor.style.display = 'none'; document.body.appendChild(anchor); anchor.click();
    document.body.removeChild(anchor); URL.revokeObjectURL(anchor.href);
    this.showFeedback("Curated archetype text file downloading!");
  }

  refineCuration() { this.renderCurationScreen(); }
  exitCurationModeAndRestart() { this.curationModeActive = false; this.startOver(); }

  openPlaygroundFromQuiz() {
    const resultStepIndex = this.getQuizStepsArray().findIndex(s => s.type === 'result');
    if (this.styleFinderStep === resultStepIndex) {
        this.lastQuizStepBeforePlayground = this.styleFinderStep;
    } else {
        this.lastQuizStepBeforePlayground = resultStepIndex !== -1 ? resultStepIndex : this.getQuizStepsArray().length -1;
    }

    if (this.elements.styleFinder) {
        this.elements.styleFinder.style.display = 'none';
    }

    if (typeof PlaygroundApp !== 'undefined') {
        if (!this.playgroundApp) {
            this.playgroundApp = new PlaygroundApp(this);
            this.playgroundApp.initializePlayground('playgroundContainer');
        }
        this.playgroundApp.showPlayground();
    } else {
        console.error("PlaygroundApp class not found. Ensure playground.js is loaded.");
        alert("Playground feature is not available at the moment.");
    }
  }
 showQuizModalAtLastStep() {
    if (this.elements.styleFinder) {
        this.elements.styleFinder.style.display = 'flex';
        const resultStepIndex = this.getQuizStepsArray().findIndex(s => s.type === 'result');
        if (this.lastQuizStepBeforePlayground === resultStepIndex && resultStepIndex !== -1) {
            this.styleFinderStep = this.lastQuizStepBeforePlayground;
        } else if (this.quizCompletedOnce && resultStepIndex !== -1) {
            this.styleFinderStep = resultStepIndex;
        } else {
            this.styleFinderStep = (this.quizCompletedOnce && resultStepIndex !== -1) ? resultStepIndex : (this.lastQuizStepBeforePlayground || 0) ;
        }
        this.curationModeActive = false;
        this.renderStyleFinder();
    }
  }
} // End of StyleFinderApp class

// --- GLOBAL INSTANTIATION ---
const styleFinderApp = new StyleFinderApp();

// --- GLOBAL EVENT LISTENERS ---
// This listener is for the general playground button on the main page (#open-playground-btn).
// If you want the playground *only* accessible from the quiz results, you can remove this
// and remove the #open-playground-btn from index.html.
document.addEventListener('DOMContentLoaded', () => {
    const openPlaygroundBtnMainPage = document.getElementById('open-playground-btn');
    if (openPlaygroundBtnMainPage) {
        openPlaygroundBtnMainPage.addEventListener('click', () => {
            if (typeof PlaygroundApp !== 'undefined') {
                if (!styleFinderApp.playgroundApp) { // Check if instance exists on styleFinderApp
                    styleFinderApp.playgroundApp = new PlaygroundApp(styleFinderApp);
                    styleFinderApp.playgroundApp.initializePlayground('playgroundContainer');
                }
                styleFinderApp.playgroundApp.showPlayground();
                if (styleFinderApp.elements.styleFinder && styleFinderApp.elements.styleFinder.style.display !== 'none') {
                   styleFinderApp.elements.styleFinder.style.display = 'none'; // Hide quiz modal if open
                }
            } else {
                console.error("PlaygroundApp class not found. Ensure playground.js is loaded AFTER script.js.");
                alert("Playground feature is not available at the moment.");
            }
        });
    }
});
