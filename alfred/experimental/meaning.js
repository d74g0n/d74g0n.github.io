class meaning {
    constructor (word) {
        this.word = word;

        this.who = undefined;
        this.where = undefined;
        this.what = undefined;
        this.when = undefined;
        this.how = undefined;
        
        this.islike = undefined;
    }
    
    //you = u (like u-turn of perspective)
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    checkIS(word){
        let ToBe = ['is','are','can'];
        
        ToBe.foreach(function(obj){
        
            if (word == obj){
                console.log('${obj}=${word}');
                return true;
            }
            
            return false;
            
        });
        
        
            
            
    }
    
}