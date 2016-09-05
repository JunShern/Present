# Present

Present (rhymes with resent) is an approach to eliminating the problems found in traditional presentation decks:
- Does not encourage users to think about their slides in terms of content and flow
- Too much time wasted on designing slides

Using Present, users should be able to overcome these problems using a simple workflow:

1. Type out a presentation script (emphasis is on content and flow)

2. Feed the script into Present, and slides are automagically generated (less time spent on designing slides)

##How It Works
###PScript
PScript is the set of rules to format plain text into presentation slides - think a very syntax-light version of LaTeX / Markdown, specifically for slide-formatting.

###Slide-generation
Present will accept as input a PScript file, and generate slides from the script using the following ideas:
- Create a slide for each paragraph (currently using [reveal.js](https://github.com/hakimel/reveal.js/ 'reveal.js'))
- Pick out 'topic words' from the paragraph using Natural Language Processing tools (currently using [nlp_compromise](https://github.com/nlp-compromise/nlp_compromise 'nlp_compromise'))
- Search for pictures based on topic words (currently using [Google CSE](https://cse.google.com/ 'Custom Search Engine'))
- Add pictures and words into the slides according to PScript rules
