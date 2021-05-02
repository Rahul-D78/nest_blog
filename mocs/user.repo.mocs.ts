export const mockUserRepo = {
    findOne(id : number) {return Promise.resolve({id: 10, name: "user10"})} 
}
        