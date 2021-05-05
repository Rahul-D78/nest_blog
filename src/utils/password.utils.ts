import * as bcrypt from 'bcrypt'
const saltRounds = 10;

export async function hashPass(password: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hashedPass) => {
            if(err) throw reject(err);
            return resolve(hashedPass) 
        })
    })
}

export async function matchPass(hash: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        bcrypt.compare(password, hash, (err, decoded) => {
            if(err) throw reject(err);
            return resolve(decoded);
        })
    })
}