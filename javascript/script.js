const keyboard=document.querySelector('.keyboard')

//adding Keyboard
for(let i=97; i<=122;i++){
	const button=document.createElement("button")
	button.classList.add("button")
	button.innerText=String.fromCharCode(i)
	keyboard.appendChild(button);
}


// Word Libariary for all the levels, each options is buttons
let options = {
	easy: [
	"Basketball", "Friendship", "Adventure", "Motorcycle", "Headlights",
  	"Pineapples", "Television", "Crocodiles", "Rainforest", "Blackboard",
  	"Spaceships", "Lighthouse", "Snowflakes", "Peppermint", "Explorers",
  	"Caterpillar", "Dragonfruit", "Sandcastle", "Windshield", "Background",
  	"Dreamworld", "Honeycombs", "Backpacker", "Masterpiece", "Snowmobile",
  	"Hummingbird", "Staircases", "Storybooks", "Childproof", "Friendzone",
  	"Rattlesnake", "Sunflowers", "Peppercorn", "Landscapes", "Bookkeeper",
  	"Chocolates", "Dragonflies", "Quicksteps", "Earthquake", "Springtime",
  	"Sweetheart", "Playground", "Raincoated", "Pencilcase", "Tombstones",
  	"Steamboats", "Umbrellas", "Campground", "Fishermens", "Adventurer",
  	"Peppermint", "Landscaper", "Snowblower", "Storylines", "Dragonborn",
  	"Quickstart", "Bookstores", "Friendlier", "Wonderland", "Unbreakable",
  	"Masterminds", "Quicksilver", "Dreamcatch", "Watermelon", "Dragonfruit",
  	"Caterpillar", "Spacesuits", "Rainforests", "Honeymooners", "Backpackers",
  	"Lighthouses", "Chocolatier", "Kindergarten", "Backgrounds", "Friendliest",
  	"Adventurers", "Peppermints", "Masterworks", "Blackboards", "Rattlesnakes",
  	"Quickstarts", "Playgrounds", "Bookkeepers", "Storybookers", "Sunflowered",
  	"Exploration", "Wonderfully", "Masterpieces", "Friendliness", "Dragonfishes",
  	"Sweethearts", "Windshields", "Caterpillars", "Televisioned", "Motorcycling",
  	"Sandcastles", "Hummingbirds", "Snowmobiling", "Dreamcatcher", "Pineappling"
	],

	medium: [
		"Astonishing", "Breathtaking", "Cheesemaker", "Declaration", "Environment",
		"Friendliest", "Generations", "Housekeeper", "Inspiration", "Journalists",
		"Knowledgeable", "Landscaping", "Merrymaking", "Negotiation", "Occupation",
		"Paddleboard", "Questioning", "Reformation", "Springboard", "Tranquility",
		"Underground", "Victorydance", "Wildernesses", "Yellowstone", "Zookeeperes",
		"Amplification", "Beneficiary", "Celebration", "Determination","Elimination",
		"Fascination", "Graduations", "Heartwarming", "Illustrator", "Justification",
		"Kilometers", "Lumberjacks", "Masterfully", "Negotiators", "Optimisation",
		"Perfection", "Quadrillion", "Resurrection", "Storyteller", "Thundering",
		"Underrated", "Volunteered", "Worshippers", "Xenophobic", "Yesteryears",
		"Ambassador", "Breakthrough", "Caterwauling", "Deforestation", "Enlightened",
		"Fundraising", "Grandmother", "Helicopters", "Investigator", "Jurisdiction",
		"Knighthoods", "Leafleting", "Manufacture", "Nationhoods", "Overriding",
		"Participator", "Quicknesses", "Respectfully", "Storytelling", "Theologians",
		"Unfaltering", "Victorious", "Wholesomely", "Xylophones", "Youthfulness",
		"Alleviation", "Bombardment", "Communicate", "Demonstrator", "Equilibrium",
		"Firefighter", "Glistening", "Humanitarian", "Infrastructure", "Judiciously",
		"Knowledgeably", "Leadership", "Maneuvering", "Nourishment", "Outlandishly",
		"Participation", "Quickwitted", "Rejuvenation", "Suspension", "Transfusion",
		"Ubiquitously", "Vibrational", "Wholehearted", "Xenophobia", "Yearbookish",
		"Zoologically"
	],

	hard: [
		"Accomplishment", "Acknowledgement", "Administration", "Adventurousness",
		"Anthropologist", "Appreciation", "Authorization", "Beautification",
		"Choreographers", "Circumstantial", "Classification", "Communication",
		"Comprehensible", "Computerization", "Conglomeration", "Constitutional",
		"Contraception", "Counterbalance", "Counterproductive", "Determination",
		"Differentiation", "Disqualification", "Electromagnetic", "Environmental",
		"Establishment", "Excommunication", "Extraordinarily", "Extraterrestrial",
		"Fashionability", "Fertilizations", "Flabbergasting", "Formalizations",
		"Fortifications", "Generalizations", "Grammaticalness", "Hallucinations",
		"Humanitarianism", "Immaterialities", "Implementation", "Impossibilities",
		"Indispensables", "Individualistic", "Industrialization", "Inexhaustibility",
		"Intercontinental", "Interrelationships", "Internationally", "Interrogatively",
		"Introspectively", "Justifications", "Knowledgeability", "Lamentabilities",
		"Magnifications", "Malfunctioning", "Misinterpretation", "Misunderstanding",
		"Modernistically", "Morphologically", "Nonflammability", "Nonspecifically",
		"Organizationally", "Overcomplicating", "Overexaggeration", "Oversimplifying",
		"Palaeontologist", "Participations", "Personalization", "Photobiological",
		"Photosensitizer", "Preconditioning", "Professionalism", "Psychologically",
		"Rationalization", "Reconstructable", "Reindustrialize", "Reliabilization",
		"Reproducibility", "Revitalizations", "Semiconducting", "Sensationalized",
		"Sophistication", "Straightforward", "Subterraneanly", "Supercalifragile",
		"Superintendence", "Supernaturalist", "Symbolistically", "Technologically",
		"Telecommunication", "Transfiguration", "Transformational", "Uncharacteristic",
		"Unconstitutionally", "Unparalleledly", "Unpredictability", "Weatherization",
		"Weightlessness", "Whimsicalness", "Xenotransplant", "Zoologicalness"
		], };