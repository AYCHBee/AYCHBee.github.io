/* global window, document, fetch, localStorage, Headers */
/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["errors"] }] */

const API_PREFIX = 'https://bankaa-app.herokuapp.com/api/v1/';
const accountStats = document.getElementById('accnt-stats');
const modal = document.getElementById('myModal');
const span = document.getElementsByClassName('close')[0];
const modalContent = document.getElementById('account-modal-content');
const para = document.createElement('P');
let text;

// Gotten from https://blog.abelotech.com/posts/number-currency-formatting-javascript/
const formatNumber = num => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

const fetchAllAccounts = () => {
  para.innerHTML = '';
  text = document.createTextNode('Loading...');

  para.appendChild(text);
  modalContent.appendChild(para);
  modal.style.display = 'block';

  const token = localStorage.getItem('banka-app-token');
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', token);
  fetch(`${API_PREFIX}/accounts`, {
    method: 'GET',
    headers
  })
    .then(res => res.json())
    .then(response => {
      if (response.status === 200) modal.style.display = 'none';
      const { data } = response;
      data.forEach(datum => {
        const accounts = `<div class="account-stats-card">
        ${
          datum.status === 'active'
            ? `<p class="badge-active" id="accnt-status">${datum.status}</p>`
            : `<p class="badge-inactive" id="accnt-status">${datum.status}</p>`
        }
            <p class="balance-text">Balance</p>
            <h3 class="account-balance" id="accnt-balance">&#x20A6; ${formatNumber(
              Math.round(datum.balance * 100) / 10
            )}</h3>
            <p class="balance-text">Account Number</p>
            <h3 class="account-balance" id="accnt-number">${datum.accountnumber}</h3>
            <p class="balance-text">Account Type</p>
            <h3 class="account-balance" id="accnt-type">${datum.type}</h3>
            <a href="accountinfo.html" class="accnt-info-btn" id="account-details" data-account-id=${
              datum.id
            }>View Details</a>
        </div>`;
        accountStats.innerHTML += accounts;
      });

      if (response.data.length === 0) {
        accountStats.innerHTML = `<h1>You have no accounts at this time.</h1>`;
      }
    })
    .catch(err => {
      para.innerHTML = '';
      text = document.createTextNode(`${err.message}`);
      para.appendChild(text);
      modalContent.appendChild(para);
      modal.style.display = 'block';
    });

  return true;
};

span.onclick = () => {
  modal.style.display = 'none';
};

window.onload(fetchAllAccounts());