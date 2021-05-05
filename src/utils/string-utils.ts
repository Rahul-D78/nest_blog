export function slugify(title: string): string {
    
    //title = this is my first article
    //slug  = this-is-my-first-article
    
    let slugger = []

    for(let i=0;i< title.length;i++) {
        if(i >= 30) break;

        let char = title[i].toLowerCase();

        if(char >= 'a' && char <= 'z') {
            slugger.push(char);
        }else{
            slugger.push('-');
        }
    }
    return slugger.join('');
}