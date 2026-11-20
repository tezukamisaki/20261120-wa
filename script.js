Vue.createApp({
    data(){
        return{
            cardImages:[
                {name: "猫", image: "images/1.webp"},
                {name: "犬", image: "images/2.webp"},
                {name: "うさぎ", image: "images/3.webp"},
                {name: "パンダ", image: "images/4.webp"},
                {name: "くま", image: "images/5.webp"},
                {name: "きつね", image: "images/6.webp"},
                {name: "かえる", image: "images/7.webp"},
                {name: "さる", image: "images/8.webp"}
            ],

            cards:[],

            flippedCards:[],

            turns:0,

            matchedPairs:0,

            lockBoard:false
        };
    },

    computed:{
        isGameClear(){
            return this.matchedPairs === this.cardImages.length;
        }
    },

    methods:{
        createCards(){
            const cards = [];

            this.cardImages.forEach((item,index)=>{
                for(let i = 0; i < 2; i ++){
                    cards.push({
                        id:cards.length,
                        imageId:index,
                        name: item.name,
                        image:item.image,
                        flipped:false,
                        matched:false
                    });
                }
            });

            cards.sort(()=> Math.random()-0.5);

            this.cards = cards;
        },

        flipCard(card){
            if(this.lockBoard || card.flipped ||card.matched){
                return;
            }

            card.flipped=true;

            this.flippedCards.push(card);

            if(this.flippedCards.length === 2){
                this.turns++;
                this.checkMatch();
            }
        },
        checkMatch(){
            const[card1,card2] = this.flippedCards;

            if (card1.imageId === card2.imageId){
                card1.matched = true;
                card2.matched = true;

                this.matchedPairs++;
                this.flippedCards = [];
            }else{
                this.lockBoard = true;
            
            setTimeout(()=>{
                card1.flipped = false;
                card2.flipped=false;

                this.flippedCards = [];
                this.lockBoard = false;
            },1000);
        }
    },

    restartGame(){
        this.flippedCards=[];
        this.turns = 0;
        this.matchedPairs =0;
        this.lockBoard = false;

        this.createCards();
    }
}
}).mount("#app");