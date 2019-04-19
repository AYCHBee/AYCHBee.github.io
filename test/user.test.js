import '@babel/polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

/* global it, describe, before */

const API_PREFIX = '/api/v1';

let authToken;
let staffAuthToken;

describe('User Routes', () => {
  before(done => {
    const user = {
      email: 'thor@avengers.com',
      password: 'password1'
    };
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/signin`)
      .send(user)
      .end((err, res) => {
        authToken = res.body.data[0].token;
        done();
      });
  });

  before(done => {
    const staff = {
      email: 'obiwan@therebellion.com',
      password: 'password123'
    };
    chai
      .request(app)
      .post(`${API_PREFIX}/auth/signin`)
      .send(staff)
      .end((err, res) => {
        staffAuthToken = res.body.data[0].token;
        done();
      });
  });

  it('Should fetch all accounts owned by a user (staff)', done => {
    const userEmail = 'olegunnar@manutd.com';
    chai
      .request(app)
      .get(`${API_PREFIX}/user/${userEmail}/accounts`)
      .set('Authorization', staffAuthToken)
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .eql(200);
        expect(res.body).to.have.property('data');
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('Should respond with an error when trying to get accounts for non-existing user (staff)', done => {
    const userEmail = 'notreal@user.com';
    chai
      .request(app)
      .get(`${API_PREFIX}/user/${userEmail}/accounts`)
      .set('Authorization', staffAuthToken)
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .eql(404);
        expect(res.body)
          .to.have.property('error')
          .eql('User not found');
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('Should only fetch all accounts owned by a user (client)', done => {
    const userEmail = 'thor@avengers.com';
    chai
      .request(app)
      .get(`${API_PREFIX}/user/${userEmail}/accounts`)
      .set('Authorization', authToken)
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .eql(200);
        expect(res.body).to.have.property('data');
        expect(res.status).to.equal(200);
        done();
      });
  });

  it("Should not fetch accounts owned by a user if they don't own them", done => {
    const userEmail = 'olegunnar@manutd.com';
    chai
      .request(app)
      .get(`${API_PREFIX}/user/${userEmail}/accounts`)
      .set('Authorization', authToken)
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .eql(403);
        expect(res.body)
          .to.have.property('error')
          .eql('You are not authorized to carry out that action');
        expect(res.status).to.equal(403);
        done();
      });
  });

  it("Should return an error message the user's email is invalid", done => {
    const userEmail = 'olegunnar@manutd';
    chai
      .request(app)
      .get(`${API_PREFIX}/user/${userEmail}/accounts`)
      .set('Authorization', authToken)
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .eql(400);
        expect(res.body)
          .to.have.property('error')
          .eql('Please provide a valid email address');
        expect(res.status).to.equal(400);
        done();
      });
  });
});