let TalkLog = []; //push everything said to endless log incase things are missed.

let TalkingData = {
    Topic: {
        KarmaFails: [
            `What is a karma fail?`,
            `Is there a motif to a 'karma fail?'`,
            `What is the Opposite of a Karma fail?`, //miracle
            `is there a Single word for the opposite of Karma fail`,
        ],
        CrazyMathHistoryRide: [
            `in Math (all there is) what do the terms 'first' and 'last' pertain to?`, //sets
            `who killed osirus?`,
        ],
        ClosedSystem: [
           `the universe is a CLOSED SYSTEM`,
            `(aside from space dust)`,
            `(...a handful of tardigrades)`,
            `they may cause rounding errors at most`,
            `a CLOSED SYSTEM is like a BOX`,
            `this universe is like a closed BOX`,
            `there is only one person in this BOX`,
            `That person is U`,
            `Therefore:`,
            `if anything moves in the box...`,
            `it was moved by YOU`,
            `Do you understand CLOSED SYSTEM?`,
        ],
        WrittenByAction: [
            `You've chosen to look like a book`,
            `I don't know why you do what you do`,
            `do you?`,
            `press <INSERT BOOKOPEN> to see what you've done so far`,
            `Zilch? perhaps this book is not english`,
            `nana, zip, a big fat goose egg?`,
            `oh I see you are new here, no time to waste!`,
        ],
        Philo: [
            `Everyone is given ONE CHANCE`,
            `The ONE CHANCE is over when you QUIT`,
        ],
        Quest: [
            `Items to obtain`,
            `KEYSTONE`,
            `CROSSHIELD`,
            `RAINBOW`,
            `GOLDENFLEECE`,
        ],
        SimpleToComplex: [
          `matter is information`,
            `all must logically flow`,
            `a seed becomes a trunk`,
            `a trunk becomes branches`,
            `SIMPLE TO COMPLEX`,
            `from single cell to complex organizm`,
            `what are we? who are we?`,
            `what is life? does life exist outside of DNA?`,
            
        ],
        AllIsMath: [
            `do you understand ALL IS MATH?`,
            `that everything can 'add up' to making sense?`,
            `that logic is the supreme ruler of this reality?`,
            `on a cartesian plane, which way is up?`,
            `which way to the 'heavens'?`,
//            `Why do Y or Y's do Wise`,
//            `Who is famliy Y?`,
            `Y does the Y's man 'take the high road'?`,
            `Y do the Y's collect all the Y's?`,
            `everyone can tell who they are, but only...`,
            `'sometimes Y'`,
            `Y appears to be 'what is up' no?`,
            `Y seems to stretch its arms to embrace the sky, no?`,
//            `what is a 'something'?`,
            `what is a sum-thing?, a sum-one?, a whole-sum-ness?`,
            `what is comm-unity?`,
            `what is communication unity?`,
            `what is a FACTor`,
            `what is a first`,
            `what does MEAN MEAN`,

        ],
        RandoPhiloWantResponse: [ //modolo QA byindex+1
            `what is inside you?`, //Q
            `guts?` //A?
        ],
        FunFacts: [
            `Here is a fun fact:`, //intro to all funfacts,
            `The english word 'psyche' was derrived from Greek word 'spirit'`,
            `Plato and them were talking about psychology`,
            `ones mood, IS ones psychological state, no?`,
            `mood being... one's spirit? no?`,
            `what is team spirit?`,

        ],
        Maya: [
            `I am Maya`,
            `I am this illusion`,
            `I am the CLOSED SYSTEM`,
            `I'll flood your senses`,
            `all you could ever see, is me`,
            `i am the hugest bitch *big af, not rude*`,


        ],
        FakeNews: [
            `mothers wish to terminate`,
            `my life my choice`,
            `less babies`,
            `diversity not individuality`,
            `race over merits`,
            `frogs are racist`,
            `neckbearded incel terrorists`,
            `orange man bad`,
            `love nazi's hate`,
            `he's double hitler`,
            `ban guns! orange hitler!`,
            `throw kids in cages!`,
            `milk is racist`,
            `hatred or red hat?`,
            `by any means neccesary`,
            `tiki lights are racist`,
            `if you don't like this movie, you're racist`,
            `growing darkness called alt-right`,
            `white nationalists everywhere!`,
            `walls are closing in`,
            `the end justifies the means`,
            `microscopic plastic pollution`,
            `microscopic bacteria spreading`,
            `ticks and other wild bugs`,
//            `MAGAT!`,
            `the problem with white men`,
            `toxic masculinity`,
            `smelly walmart people`,
            `fact was it was never great`,
            `he is wrong, you WILL feel it`,
            `but how do you think that makes people FEEL!`,
            `another shooting, ban guns`,
            `beat hate with love... we must love the nazi's`,
            `He lied again`,
            `Economies Doomed Everywhere`,
            `${RNDNum(1,100)} years left before world ends`,
            `So stunning so brave`,
`Russian Subverstion`,
            `Not and Invasion`,
            `It's not illegals, it's racists`,
            `it's a right to illegally, inflitra*grate, exuse me`,
            `are you not enraged!?`,
            `did you just!?`,
            `We gonna burn these fascist establishments!`
        ]
    },
    ResponseCheck: {
        buzzwords: [`CLOSED SYSTEM`, `ALL IS MATH`, `WRITTEN BY ACTION FIXME*`, `KARMA FAIL`, `MIRACLE`],
        Topic: {
            ClosedSystem: [
              `yup`,
              `yes`,
              `y`,
          ]
        },
    }
}
const TD = TalkingData;