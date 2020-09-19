/* JQUERY - RANDOM QUOTE MACHINE */

//----QUOTE SAMPLES----//

var $quotes = [
  {
    quote: "We are dying, we are dying, piecemeal our bodies are dying and our strength leaves us, and our soul cowers naked in the dark rain over the flood, cowering in the last branches of the tree of our life.",
    author: "David Herbert Lawrence"
  },

  {
    quote: "Most of the arguments to which I am a party fall somewhat short of being impressive, owing to the fact that neither I nor my opponent knows what we are talking about.",
    author: "Robert Charles Benchley"
  },

  {
    quote: "Lack of awareness of the basic unity of organism and environment is a serious and dangerous hallucination.",
    author: "Alan Watts"
  },

  {
    quote: "He who can no longer pause to wonder and stand rapt in awe, is as good as dead; his eyes are closed.",
    author: "Albert Einstein"
  },

  {
    quote: "Our trials, our sorrows, and our griefs develop us.",
    author: "Orison Swett Marden"
  },

  {
    quote: "Women are like tricks by sleight of hand, Which , to admire, we should not understand.",
    author: "William Congreve"
  },

  {
    quote: "The best discipline, maybe the only discipline that really works, is self- discipline.",
    author: "Walter Kiechel III"
  },

  {
    quote: "When you were a tadpole and I was a fish In the Paleozoic time.",
    author: "Langdon Smith"
  },

  {
    quote: "The most insignificant people are the most apt to sneer at others. They are safe from reprisals, and have no hope of rising in their own esteem but by lowering their neighbors.",
    author: "William Hazlitt"
  }
];

//----EVENTS----//

 $(document).ready(function() {

  // On document load, fetch a quote
   getQuote($quotes.length); 

   // On button click, fetch a new quote
   // Fade-in animate the components
   $("#new-quote").click(function() { 
      $("#text").fadeOut();
      $("#author").fadeOut();

      setTimeout(function() { 
        getQuote($quotes.length); 
        $("#text").fadeIn();
        $("#author").fadeIn();
      }, 300);          
   }); 
 });

 //----FUNCTIONS----//

 // Fetch a new random quote
 function getQuote(size) {
    $("#text").empty();
    $("#author").empty();
    var $rnd = getRndInteger(0, size);

    console.log($rnd);
    var $chosen = $quotes[$rnd];

    $("#text").append($chosen.quote);
    $("#author").append($chosen.author);

    // Share to Twitter - API
    $("#tweet-quote").prop('href', "https://twitter.com/intent/tweet?text="+ $chosen.quote);
 }

 // Get a random integer between provided minimum and maximum values
 function getRndInteger(min, max) {
    // Floor is an integer value less or equal to the provided numerical value
    // Random returns a random numerical value between 0 and 1
    
    // Multiplied with a difference between minimum and maximum, it will give a value that
    // will truly fall within the provided range (in this case, between 0 and array size)
    return Math.floor(Math.random() * (max - min) ) + min;
}

