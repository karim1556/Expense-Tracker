document.addEventListener("DOMContentLoaded", () => {
    const addExpenseBtn = document.querySelector(".add-expense-btn");
    const clearExpensesBtn = document.querySelector(".clear-expenses-btn");
    const expenseForm = document.querySelector("#expense-form");
    const descriptionInput = document.querySelector("#description");
    const amountInput = document.querySelector("#amount");
    const expenseList = document.querySelector(".expense-list");
    const totalExpenses = document.querySelector(".total-expenses h3 span");

    let expenses = [];
    let total = 0;

    function renderExpenses() {
        let html = "";
        expenses.forEach((expense, index) => {
            html += `
                <div class="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow mb-3">
                    <span class="text-gray-700">${expense.description}</span>
                    <span class="text-red-500 font-bold">$${expense.amount.toFixed(2)}</span>
                    <button class="delete-expense-btn text-red-500 hover:text-red-700">&times;</button>
                </div>
            `;
        });

        expenseList.innerHTML = html;
        totalExpenses.innerText = `$${total.toFixed(2)}`;
    }

    function addExpense(description, amount) {
        const expense = {
            description: description,
            amount: amount
        };

        expenses.push(expense);
        total += amount;
        renderExpenses();
    }

    function deleteExpense(index) {
        total -= expenses[index].amount;
        expenses.splice(index, 1);
        renderExpenses();
    }

    function clearAllExpenses() {
        expenses = [];
        total = 0;
        renderExpenses();
    }

    addExpenseBtn.addEventListener("click", () => {
        expenseForm.classList.toggle("hidden");
    });

    expenseForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const description = descriptionInput.value.trim();
        const amount = parseFloat(amountInput.value);

        if (description && !isNaN(amount)) {
            addExpense(description, amount);
            descriptionInput.value = "";
            amountInput.value = "";
            expenseForm.classList.add("hidden");
        }
    });

    expenseList.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-expense-btn")) {
            const index = Array.from(event.target.parentNode.parentNode.children)
                .indexOf(event.target.parentNode);
            
            deleteExpense(index);
        }
    });

    clearExpensesBtn.addEventListener("click", clearAllExpenses);
});
