const request = require('supertest');
const expect = require('expect');
var {app} = require('./../server').app;
var {User} = require('./../models/user');
beforeEach((done)=>{
    User.remove({}).then(()=>{
        done();
    });
});

var body = {
    name:'Rajkaran',
    email:'rajkaranrk164@gmail.com',
    password:'12345'
};
describe('Post Test',()=>{
    it('should return the response with email and name',(done)=>{
        request(app)
            .post('/users')
            .send(body)
            .expect(200)
            .expect((res)=>{
                expect(res.body.name).toBe(body.name);
            }).end((err,res)=>{
                if(err){
                    return done(err);
                }
                done();
            });
    });
})