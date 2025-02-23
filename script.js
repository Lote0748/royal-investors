function calculateReturns() {
    let amount = document.getElementById("amount").value;
    if (amount <= 0 || isNaN(amount)) {
        alert("Please enter a valid investment amount.");
        return;
    }

    // Calculate 11% monthly return
    let profit = amount * 0.11;
    let totalReturn = parseFloat(amount) + profit;

    // Calculate maturity date (1 month from today)
    let today = new Date();
    let maturityDate = new Date(today.setMonth(today.getMonth() + 1));
    let formattedDate = maturityDate.toDateString();

    // Display results
    document.getElementById("returns").innerHTML = `Expected Monthly Return: KES ${totalReturn.toFixed(2)}`;
    document.getElementById("maturity").innerHTML = `Maturity Date: ${formattedDate}`;
}
// Simulated list of valid M-Pesa transaction codes
const validMpesaCodes = ["MPESA12345", "MPESA67890", "MPESA54321"];

function verifyPayment() {
    let enteredCode = document.getElementById("mpesaCode").value.trim().toUpperCase();
    
    if (validMpesaCodes.includes(enteredCode)) {
        document.getElementById("statusMessage").innerHTML = "✅ Payment Verified Successfully!";
        document.getElementById("statusMessage").style.color = "green";
    } else {
        document.getElementById("statusMessage").innerHTML = "❌ Invalid M-Pesa Code. Please try again.";
        document.getElementById("statusMessage").style.color = "red";
    }
}
// Simulated list of valid M-Pesa transaction codes
const validMpesaCodes = ["MPESA12345", "MPESA67890", "MPESA54321"];

function verifyPayment() {
    let enteredCode = document.getElementById("mpesaCode").value.trim().toUpperCase();
    
    if (validMpesaCodes.includes(enteredCode)) {
        document.getElementById("statusMessage").innerHTML = "✅ Payment Verified Successfully!";
        document.getElementById("statusMessage").style.color = "green";

        // Save payment in local storage
        let payments = JSON.parse(localStorage.getItem("payments")) || [];
        payments.push({ code: enteredCode, date: new Date().toLocaleString() });
        localStorage.setItem("payments", JSON.stringify(payments));
        
        alert("Payment saved successfully!");
    } else {
        document.getElementById("statusMessage").innerHTML = "❌ Invalid M-Pesa Code. Please try again.";
        document.getElementById("statusMessage").style.color = "red";
    }
}

function sendMessage() {
    let username = localStorage.getItem("loggedInUser") || "Guest";
    let message = document.getElementById("chatInput").value.trim();
    
    if (message === "") return;

    let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    chatHistory.push({ user: username, text: message, time: new Date().toLocaleTimeString() });

    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    displayChat();
    document.getElementById("chatInput").value = "";
}

function displayChat() {
    let chatBox = document.getElementById("chatBox");
    chatBox.innerHTML = "";
    
    let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    chatHistory.forEach(chat => {
        chatBox.innerHTML += `<p><strong>${chat.user}:</strong> ${chat.text} <small>(${chat.time})</small></p>`;
    });
}

window.onload = displayChat;
function signup() {
    let username = document.getElementById("signupUsername").value.trim();
    let password = document.getElementById("signupPassword").value.trim();

    if (username === "" || password === "") {
        document.getElementById("signupMessage").innerHTML = "❌ Please fill in all fields.";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(user => user.username === username)) {
        document.getElementById("signupMessage").innerHTML = "❌ Username already exists.";
        return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    document.getElementById("signupMessage").innerHTML = "✅ Signup successful! You can now login.";
}

function login() {
    let username = document.getElementById("loginUsername").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "investment.html"; // Redirect after login
    } else {
        document.getElementById("loginMessage").innerHTML = "❌ Invalid credentials.";
    }
}
function loadDashboard() {
    let username = localStorage.getItem("loggedInUser");
    if (!username) {
        window.location.href = "login.html"; // Redirect if not logged in
        return;
    }
    document.getElementById("username").innerText = username;

    // Load investments
    let investments = JSON.parse(localStorage.getItem("investments")) || [];
    let totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
    let expectedReturn = totalInvested * 1.11; // 11% return

    document.getElementById("totalInvested").innerText = totalInvested.toFixed(2);
    document.getElementById("expectedReturn").innerText = expectedReturn.toFixed(2);

    // Load payment history
    let payments = JSON.parse(localStorage.getItem("payments")) || [];
    let paymentList = document.getElementById("paymentHistory");
    paymentList.innerHTML = "";

    if (payments.length === 0) {
        paymentList.innerHTML = "<li>No payments made yet.</li>";
    } else {
        payments.forEach(payment => {
            let listItem = document.createElement("li");
            listItem.innerText = `✅ ${payment.code} - ${payment.date}`;
            paymentList.appendChild(listItem);
        });
    }
}

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}

window.onload = loadDashboard;
function saveInvestment(amount) {
    let investments = JSON.parse(localStorage.getItem("investments")) || [];
    investments.push({ amount: parseFloat(amount), date: new Date().toLocaleString() });
    localStorage.setItem("investments", JSON.stringify(investments));
}

function calculateReturns() {
    let amount = document.getElementById("amount").value;
    if (amount <= 0 || isNaN(amount)) {
        alert("Please enter a valid investment amount.");
        return;
    }

    // Calculate 11% monthly return
    let profit = amount * 0.11;
    let totalReturn = parseFloat(amount) + profit;

    // Calculate maturity date (1 month from today)
    let today = new Date();
    let maturityDate = new Date(today.setMonth(today.getMonth() + 1));
    let formattedDate = maturityDate.toDateString();

    // Display results
    document.getElementById("returns").innerHTML = `Expected Monthly Return: KES ${totalReturn.toFixed(2)}`;
    document.getElementById("maturity").innerHTML = `Maturity Date: ${formattedDate}`;

    // Save investment
    saveInvestment(amount);
}
function loadAdminPanel() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userList = document.getElementById("userList");
    userList.innerHTML = "<h3>Registered Users:</h3>";

    users.forEach(user => {
        let listItem = document.createElement("li");
        listItem.innerText = `👤 ${user.username}`;
        userList.appendChild(listItem);
    });

    let investments = JSON.parse(localStorage.getItem("investments")) || [];
    let investmentList = document.getElementById("investmentList");
    investmentList.innerHTML = "<h3>All Investments:</h3>";

    investments.forEach(inv => {
        let listItem = document.createElement("li");
        listItem.innerText = `💰 KES ${inv.amount} - ${inv.date}`;
        investmentList.appendChild(listItem);
    });
}

window.onload = loadAdminPanel;
function deposit() {
    let amount = parseFloat(document.getElementById("depositAmount").value);
    if (amount <= 0 || isNaN(amount)) {
        alert("Enter a valid deposit amount.");
        return;
    }

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push({ type: "Deposit", amount, date: new Date().toLocaleString() });

    localStorage.setItem("transactions", JSON.stringify(transactions));
    alert("Deposit successful!");
    displayTransactions();
}

function withdraw() {
    let amount = parseFloat(document.getElementById("withdrawAmount").value);
    if (amount <= 0 || isNaN(amount)) {
        alert("Enter a valid withdrawal amount.");
        return;
    }

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push({ type: "Withdrawal", amount, date: new Date().toLocaleString() });

    localStorage.setItem("transactions", JSON.stringify(transactions));
    alert("Withdrawal request submitted!");
    displayTransactions();
}

function displayTransactions() {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let transactionList = document.getElementById("transactionHistory");
    transactionList.innerHTML = "";

    if (transactions.length === 0) {
        transactionList.innerHTML = "<li>No transactions yet.</li>";
    } else {
        transactions.forEach(txn => {
            let listItem = document.createElement("li");
            listItem.innerText = `${txn.type}: KES ${txn.amount} - ${txn.date}`;
            transactionList.appendChild(listItem);
        });
    }
}

window.onload = displayTransactions;
function requestWithdrawal() {
    let amount = parseFloat(document.getElementById("withdrawAmount").value);
    if (amount <= 0 || isNaN(amount)) {
        alert("Enter a valid withdrawal amount.");
        return;
    }

    let withdrawals = JSON.parse(localStorage.getItem("withdrawals")) || [];
    withdrawals.push({ amount, status: "Pending", date: new Date().toLocaleString() });
    localStorage.setItem("withdrawals", JSON.stringify(withdrawals));

    alert("Withdrawal request submitted! Awaiting admin approval.");
    displayWithdrawals();
}

// Admin Panel: Approve or Reject Withdrawals
function loadAdminWithdrawals() {
    let withdrawals = JSON.parse(localStorage.getItem("withdrawals")) || [];
    let adminList = document.getElementById("adminWithdrawals");

    adminList.innerHTML = "";
    withdrawals.forEach((w, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `KES ${w.amount} - ${w.date} | Status: ${w.status} 
            <button onclick="approveWithdrawal(${index})">Approve</button> 
            <button onclick="rejectWithdrawal(${index})">Reject</button>`;
        adminList.appendChild(listItem);
    });
}

function approveWithdrawal(index) {
    let withdrawals = JSON.parse(localStorage.getItem("withdrawals"));
    withdrawals[index].status = "Approved";
    localStorage.setItem("withdrawals", JSON.stringify(withdrawals));
    alert("Withdrawal approved!");
    loadAdminWithdrawals();
}

function rejectWithdrawal(index) {
    let withdrawals = JSON.parse(localStorage.getItem("withdrawals"));
    withdrawals[index].status = "Rejected";
    localStorage.setItem("withdrawals", JSON.stringify(withdrawals));
    alert("Withdrawal rejected.");
    loadAdminWithdrawals();
}

window.onload = function() {
    displayWithdrawals();
    loadAdminWithdrawals();
};
function sendMessage() {
    let message = document.getElementById("chatMessage").value;
    let username = localStorage.getItem("loggedInUser") || "Guest";
    let time = new Date().toLocaleTimeString();

    if (message.trim() === "") return;

    let chatHistory = JSON.parse(localStorage.getItem("chat")) || [];
    chatHistory.push({ user: username, text: message, timestamp: time });
    localStorage.setItem("chat", JSON.stringify(chatHistory));

    displayChat();
    document.getElementById("chatMessage").value = "";
}

function displayChat() {
    let chatHistory = JSON.parse(localStorage.getItem("chat")) || [];
    let chatBox = document.getElementById("chatBox");
    chatBox.innerHTML = "";

    chatHistory.forEach(msg => {
        let msgDiv = document.createElement("div");
        msgDiv.innerHTML = `<strong>${msg.user}</strong> [${msg.timestamp}]: ${msg.text}`;
        chatBox.appendChild(msgDiv);
    });
}

window.onload = displayChat;
function sendNotification(type, message) {
    let notifications = JSON.parse(localStorage.getItem("notifications")) || [];
    notifications.push({ type, message, date: new Date().toLocaleString() });
    localStorage.setItem("notifications", JSON.stringify(notifications));
}

function displayNotifications() {
    let notifications = JSON.parse(localStorage.getItem("notifications")) || [];
    let notifList = document.getElementById("notifications");

    notifList.innerHTML = "";
    notifications.forEach(notif => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `📩 ${notif.type}: ${notif.message} - ${notif.date}`;
        notifList.appendChild(listItem);
    });
}

// Example: Notify user when a withdrawal is approved
function approveWithdrawal(index) {
    let withdrawals = JSON.parse(localStorage.getItem("withdrawals"));
    withdrawals[index].status = "Approved";
    localStorage.setItem("withdrawals", JSON.stringify(withdrawals));

    sendNotification("Withdrawal Approved", `Your withdrawal of KES ${withdrawals[index].amount} has been approved.`);
    alert("Withdrawal approved!");
    loadAdminWithdrawals();
}

window.onload = displayNotifications;
function generateReferralCode(username) {
    return username.substring(0, 3) + Math.floor(1000 + Math.random() * 9000); // e.g., "Joh1234"
}

function signup() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let referralCode = document.getElementById("referralCode").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Check if username exists
    if (users.some(user => user.username === username)) {
        alert("Username already exists. Choose another one.");
        return;
    }

    let userReferralCode = generateReferralCode(username);
    users.push({ username, password, referralCode: userReferralCode, referredBy: referralCode, balance: 0 });

    localStorage.setItem("users", JSON.stringify(users));

    // Reward referrer if a valid code was used
    rewardReferrer(referralCode);

    alert("Signup successful! Your referral code: " + userReferralCode);
    window.location.href = "login.html";
}

function rewardReferrer(referralCode) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let referrer = users.find(user => user.referralCode === referralCode);

    if (referrer) {
        referrer.balance += 500; // Reward KES 500 for each successful referral
        localStorage.setItem("users", JSON.stringify(users));
        sendNotification("Referral Bonus", `You earned KES 500 for a referral!`);
    }
}
function loadDashboard() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = localStorage.getItem("loggedInUser");

    let user = users.find(u => u.username === currentUser);
    if (user) {
        document.getElementById("userReferralCode").innerText = user.referralCode;
        document.getElementById("userBalance").innerText = user.balance;
    }
}

window.onload = loadDashboard;
function withdrawReferralEarnings() {
    let amount = parseFloat(document.getElementById("referralWithdrawAmount").value);
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = localStorage.getItem("loggedInUser");

    let user = users.find(u => u.username === currentUser);
    if (!user) return;

    if (amount <= 0 || isNaN(amount) || amount > user.balance) {
        alert("Invalid amount or insufficient balance.");
        return;
    }

    user.balance -= amount;
    localStorage.setItem("users", JSON.stringify(users));

    alert("Withdrawal successful! Amount: KES " + amount);
    document.getElementById("userBalance").innerText = user.balance;
}
function showReferredUsers() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = localStorage.getItem("loggedInUser");

    let user = users.find(u => u.username === currentUser);
    if (!user) return;

    let referredUsers = users.filter(u => u.referredBy === user.referralCode);
    let list = document.getElementById("referredUsersList");

    list.innerHTML = "";
    referredUsers.forEach(u => {
        let listItem = document.createElement("li");
        listItem.innerText = u.username;
        list.appendChild(listItem);
    });
}

window.onload = function() {
    loadDashboard();
    showReferredUsers();
};
function rewardReferrer(referralCode) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let referrer = users.find(user => user.referralCode === referralCode);

    if (referrer) {
        referrer.balance += 500;
        localStorage.setItem("users", JSON.stringify(users));

        sendNotification("Referral Bonus", `You earned KES 500! ${referralCode} just signed up using your referral.`);
    }
}
function withdrawReferralEarnings() {
    let amount = parseFloat(document.getElementById("referralWithdrawAmount").value);
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = localStorage.getItem("loggedInUser");

    let user = users.find(u => u.username === currentUser);
    if (!user) return;

    if (amount < 1000) {
        alert("Minimum withdrawal amount is KES 1000.");
        return;
    }

    if (amount > user.balance) {
        alert("Insufficient balance.");
        return;
    }

    user.balance -= amount;
    localStorage.setItem("users", JSON.stringify(users));

    alert("Withdrawal successful! Amount: KES " + amount);
    document.getElementById("userBalance").innerText = user.balance;
}
function rewardReferrer(referralCode) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let referrer = users.find(user => user.referralCode === referralCode);

    if (referrer) {
        referrer.balance += 500; // First-level referral reward
        localStorage.setItem("users", JSON.stringify(users));
        sendNotification("Referral Bonus", `You earned KES 500! ${referralCode} just signed up using your referral.`);

        // Second-level referral bonus
        let secondLevelReferrer = users.find(user => user.referralCode === referrer.referredBy);
        if (secondLevelReferrer) {
            secondLevelReferrer.balance += 200; // Second-level referral reward
            localStorage.setItem("users", JSON.stringify(users));
            sendNotification("Referral Bonus", `You earned KES 200 from a second-level referral.`);
        }
    }
}
function updateLeaderboard() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    let leaderboardData = users.map(user => {
        let referrals = users.filter(u => u.referredBy === user.referralCode).length;
        return { username: user.username, referrals };
    });

    leaderboardData.sort((a, b) => b.referrals - a.referrals);

    let leaderboardList = document.getElementById("leaderboard");
    leaderboardList.innerHTML = "";

    leaderboardData.slice(0, 5).forEach((user, index) => {
        let listItem = document.createElement("li");
        listItem.innerText = `${index + 1}. ${user.username} - ${user.referrals} referrals`;
        leaderboardList.appendChild(listItem);
    });
}

window.onload = function() {
    loadDashboard();
    showReferredUsers();
    updateLeaderboard();
};
function shareReferralCode() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = localStorage.getItem("loggedInUser");

    let user = users.find(u => u.username === currentUser);
    if (!user) return;

    let referralMessage = `Join Royal Investors using my referral code: ${user.referralCode}`;
    navigator.clipboard.writeText(referralMessage).then(() => {
        alert("Referral code copied! Share it with your friends.");
    });
}
function updateReferralProgress() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = localStorage.getItem("loggedInUser");

    let user = users.find(u => u.username === currentUser);
    if (!user) return;

    let maxTarget = 10000; // Example goal
    let progressValue = Math.min(user.balance, maxTarget);

    document.getElementById("referralProgress").value = progressValue;
    document.getElementById("progressAmount").innerText = progressValue;
}

window.onload = function() {
    loadDashboard();
    showReferredUsers();
    updateLeaderboard();
    updateReferralProgress();
};
function rewardTopReferrer() {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let leaderboardData = users.map(user => {
        let referrals = users.filter(u => u.referredBy === user.referralCode).length;
        return { username: user.username, referrals };
    });

    leaderboardData.sort((a, b) => b.referrals - a.referrals);
    if (leaderboardData.length > 0) {
        let topReferrer = leaderboardData[0];
        let user = users.find(u => u.username === topReferrer.username);
        user.balance += 2000; // Special bonus

        localStorage.setItem("users", JSON.stringify(users));
        sendNotification("Top Referrer Reward", `${user.username}, you earned KES 2000 as the top referrer!`);
    }
}

// Call this function at the start of each new month
setInterval(rewardTopReferrer, 30 * 24 * 60 * 60 * 1000);
function shareViaWhatsApp() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = localStorage.getItem("loggedInUser");

    let user = users.find(u => u.username === currentUser);
    if (!user) return;

    let message = `Join Royal Investors using my referral code: ${user.referralCode}`;
    let whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
}