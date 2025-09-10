// // Версия при котором нажатие кнопки "пришел оплатить" вызывает диалоговое окно, где какая чась долга будет покрыт. 

// // document.addEventListener('DOMContentLoaded', () => {
// //     const form = document.getElementById('product-form');
// //     const productTable = document.getElementById('product-table').querySelector('tbody');
// //     const searchInput = document.getElementById('search-input');
// //     const salesTable = document.getElementById('sales-table').querySelector('tbody');
// //     const salesSearchInput = document.createElement('input');
// //     salesSearchInput.placeholder = "Поиск по продажам";
// //     document.body.insertBefore(salesSearchInput, salesTable.parentElement);

// //     let products = JSON.parse(localStorage.getItem('products')) || [];
// //     let sales = JSON.parse(localStorage.getItem('sales')) || {};

// //     form.addEventListener('submit', (e) => {
// //         e.preventDefault();

// //         const name = document.getElementById('product-name').value;
// //         const quantity = parseInt(document.getElementById('product-quantity').value, 10);
// //         const costPrice = parseFloat(document.getElementById('product-cost-price').value);
// //         const salePrice = parseFloat(document.getElementById('product-sale-price').value);

// //         const product = { name, quantity, costPrice, salePrice, id: Date.now() };

// //         products.push(product);
// //         localStorage.setItem('products', JSON.stringify(products));
// //         displayProducts();
// //         form.reset();
// //     });

// //     searchInput.addEventListener('input', () => {
// //         displayProducts(searchInput.value);
// //     });

// //     salesSearchInput.addEventListener('input', () => {
// //         displaySales(salesSearchInput.value);
// //     });

// //     function displayProducts(searchTerm = '') {
// //         productTable.innerHTML = '';
// //         products
// //             .filter(product =>
// //                 product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //                 product.quantity.toString().includes(searchTerm) ||
// //                 product.costPrice.toString().includes(searchTerm) ||
// //                 product.salePrice.toString().includes(searchTerm)
// //             )
// //             .forEach(product => {
// //                 const row = document.createElement('tr');
// //                 row.innerHTML = `
// //                     <td>${product.name}</td>
// //                     <td>${product.quantity}</td>
// //                     <td>${product.costPrice.toFixed(2)}</td>
// //                     <td>${product.salePrice.toFixed(2)}</td>
// //                     <td>
// //                         <button onclick="sellProduct(${product.id})">Продать</button>
// //                         <button onclick="editProduct(${product.id})">Редактировать</button>
// //                         <button onclick="deleteProduct(${product.id})">Удалить</button>
// //                     </td>
// //                 `;
// //                 productTable.appendChild(row);
// //             });
// //     }

// //     window.sellProduct = (id) => {
// //         const product = products.find(p => p.id === id);
// //         const quantityToSell = parseInt(prompt(`Введите количество для продажи (доступно: ${product.quantity}):`), 10);
// //         const customSalePrice = parseFloat(prompt(`Введите цену продажи (текущая цена: ${product.salePrice.toFixed(2)}):`));
// //         const isDebt = confirm('Продажа в долг?');

// //         if (isNaN(quantityToSell) || isNaN(customSalePrice) || quantityToSell > product.quantity || quantityToSell <= 0) {
// //             alert('Некорректное количество или цена. Попробуйте еще раз.');
// //             return;
// //         }

// //         product.quantity -= quantityToSell;
// //         const profit = (customSalePrice - product.costPrice) * quantityToSell;
// //         const date = new Date().toLocaleDateString();
// //         const time = new Date().toLocaleTimeString();
// //         const saleDetail = {
// //             time,
// //             name: product.name,
// //             quantity: quantityToSell,
// //             salePrice: customSalePrice,
// //             costPrice: product.costPrice,
// //             isDebt,
// //             debtPaid: false,
// //             remainingDebt: isDebt ? customSalePrice * quantityToSell : 0,
// //             paidAmount: 0
// //         };

// //         sales[date] = sales[date] || { totalProfit: 0, details: [] };
// //         sales[date].details.push(saleDetail);

// //         // Если продажа не в долг, добавляем прибыль сразу
// //         if (!isDebt) {
// //             sales[date].totalProfit += profit;
// //         }

// //         localStorage.setItem('sales', JSON.stringify(sales));
// //         localStorage.setItem('products', JSON.stringify(products));
// //         displayProducts();
// //         displaySales();
// //     };

// //     window.editProduct = (id) => {
// //         const product = products.find(p => p.id === id);
// //         document.getElementById('product-name').value = product.name;
// //         document.getElementById('product-quantity').value = product.quantity;
// //         document.getElementById('product-cost-price').value = product.costPrice;
// //         document.getElementById('product-sale-price').value = product.salePrice;
// //         deleteProduct(id);
// //     };

// //     window.deleteProduct = (id) => {
// //         products = products.filter(p => p.id !== id);
// //         localStorage.setItem('products', JSON.stringify(products));
// //         displayProducts();
// //     };

// //     function displaySales(searchTerm = '') {
// //         salesTable.innerHTML = '';
// //         Object.entries(sales).forEach(([date, { totalProfit, details }]) => {
// //             const row = document.createElement('tr');
// //             row.innerHTML = `
// //                 <td>${date}</td>
// //                 <td>${totalProfit.toFixed(2)}</td>
// //                 <td><button onclick="toggleDetails('${date}')">Подробнее</button></td>
// //             `;
// //             salesTable.appendChild(row);

// //             const detailsRow = document.createElement('tr');
// //             detailsRow.id = `details-${date}`;
// //             detailsRow.style.display = 'none';
// //             const detailsContent = details
// //                 .filter(detail =>
// //                     detail.time.includes(searchTerm) ||
// //                     detail.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //                     detail.quantity.toString().includes(searchTerm) ||
// //                     detail.salePrice.toString().includes(searchTerm) ||
// //                     (detail.isDebt ? 'Да' : 'Нет').includes(searchTerm) ||
// //                     (detail.debtPaid ? 'Нет' : 'Да').includes(searchTerm)
// //                 )
// //                 .map(detail => `
// //                     <div>
// //                         ${detail.time} ${detail.name} ${detail.quantity} ${detail.salePrice.toFixed(2)}
// //                         (${detail.isDebt ? 'Да' : 'Нет'}) 
// //                         <span>Неоплачено: ${detail.remainingDebt.toFixed(2)}</span>
// //                         ${detail.isDebt && detail.remainingDebt > 0 ? 
// //                             `<button onclick="payDebt('${date}', '${detail.time}')">Пришел оплатить</button>` 
// //                             : ''}
// //                     </div>
// //                 `).join('');
// //             detailsRow.innerHTML = `<td colspan="3">${detailsContent}</td>`;
// //             salesTable.appendChild(detailsRow);
// //         });
// //     }

// //     window.toggleDetails = (date) => {
// //         const detailsRow = document.getElementById(`details-${date}`);
// //         detailsRow.style.display = detailsRow.style.display === 'none' ? '' : 'none';
// //     };

// //     window.payDebt = (date, time) => {
// //         const sale = sales[date].details.find(detail => detail.time === time);
// //         if (!sale || !sale.isDebt || sale.remainingDebt <= 0) {
// //             alert('Долг уже оплачен или данные не найдены.');
// //             return;
// //         }

// //         const paymentAmount = parseFloat(prompt(`Введите сумму оплаты (осталось: ${sale.remainingDebt.toFixed(2)}):`));
// //         if (isNaN(paymentAmount) || paymentAmount <= 0 || paymentAmount > sale.remainingDebt) {
// //             alert('Некорректная сумма.');
// //             return;
// //         }

// //         sale.remainingDebt -= paymentAmount;
// //         sale.paidAmount += paymentAmount;

// //         // Корректный расчет себестоимости оплаченной части и прибыли от оплаты
// //         const costForPaidAmount = sale.costPrice * (paymentAmount / sale.salePrice);
// //         const profitToAdd = paymentAmount - costForPaidAmount;

// //         // Проверка на существование и корректное значение общей прибыли
// //         sales[date].totalProfit = parseFloat(sales[date].totalProfit) || 0;
// //         sales[date].totalProfit += profitToAdd;

// //         if (sale.remainingDebt === 0) {
// //             sale.debtPaid = true; // Отмечаем, что долг полностью оплачен
// //         }

// //         localStorage.setItem('sales', JSON.stringify(sales));
// //         displaySales();
// //     };

// //     displayProducts();
// //     displaySales();
// // });
// // ///////////////////////////////////////////////////////////////////////////////////////////

// // Версия при котором нажатие кнопки "пришел оплатить" будет означать, что вес долг был покрыт. 

// // document.addEventListener('DOMContentLoaded', () => {
// //     const form = document.getElementById('product-form');
// //     const productTable = document.getElementById('product-table').querySelector('tbody');
// //     const searchInput = document.getElementById('search-input');
// //     const salesTable = document.getElementById('sales-table').querySelector('tbody');
// //     const salesSearchInput = document.createElement('input');
// //     salesSearchInput.placeholder = "Поиск по продажам";
// //     document.body.insertBefore(salesSearchInput, salesTable.parentElement);

// //     let products = JSON.parse(localStorage.getItem('products')) || [];
// //     let sales = JSON.parse(localStorage.getItem('sales')) || {};

// //     form.addEventListener('submit', (e) => {
// //         e.preventDefault();

// //         const name = document.getElementById('product-name').value;
// //         const quantity = parseInt(document.getElementById('product-quantity').value, 10);
// //         const costPrice = parseFloat(document.getElementById('product-cost-price').value);
// //         const salePrice = parseFloat(document.getElementById('product-sale-price').value);

// //         const product = { name, quantity, costPrice, salePrice, id: Date.now() };

// //         products.push(product);
// //         localStorage.setItem('products', JSON.stringify(products));
// //         displayProducts();
// //         form.reset();
// //     });

// //     searchInput.addEventListener('input', () => {
// //         displayProducts(searchInput.value);
// //     });

// //     salesSearchInput.addEventListener('input', () => {
// //         displaySales(salesSearchInput.value);
// //     });

// //     function displayProducts(searchTerm = '') {
// //         productTable.innerHTML = '';
// //         products
// //             .filter(product =>
// //                 product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //                 product.quantity.toString().includes(searchTerm) ||
// //                 product.costPrice.toString().includes(searchTerm) ||
// //                 product.salePrice.toString().includes(searchTerm)
// //             )
// //             .forEach(product => {
// //                 const row = document.createElement('tr');
// //                 row.innerHTML = `
// //                     <td>${product.name}</td>
// //                     <td>${product.quantity}</td>
// //                     <td>${product.costPrice.toFixed(2)}</td>
// //                     <td>${product.salePrice.toFixed(2)}</td>
// //                     <td>
// //                         <button onclick="sellProduct(${product.id})">Продать</button>
// //                         <button onclick="sellProductOnCredit(${product.id})">Продать в долг</button>
// //                         <button onclick="editProduct(${product.id})">Редактировать</button>
// //                         <button onclick="deleteProduct(${product.id})">Удалить</button>
// //                     </td>
// //                 `;
// //                 productTable.appendChild(row);
// //             });
// //     }

// //     window.sellProduct = (id) => {
// //         const product = products.find(p => p.id === id);
// //         const quantityToSell = parseInt(prompt(`Введите количество для продажи (доступно: ${product.quantity}):`), 10);
// //         const customSalePrice = parseFloat(prompt(`Введите цену продажи (текущая цена: ${product.salePrice.toFixed(2)}):`));

// //         if (isNaN(quantityToSell) || isNaN(customSalePrice) || quantityToSell > product.quantity || quantityToSell <= 0) {
// //             alert('Некорректное количество или цена. Попробуйте еще раз.');
// //             return;
// //         }

// //         product.quantity -= quantityToSell;
// //         const profit = (customSalePrice - product.costPrice) * quantityToSell;
// //         const date = new Date().toLocaleDateString();
// //         const time = new Date().toLocaleTimeString();
// //         const saleDetail = {
// //             time,
// //             name: product.name,
// //             quantity: quantityToSell,
// //             salePrice: customSalePrice,
// //             isDebt: false,
// //             debtPaid: true,
// //             remainingDebt: 0,
// //             paidAmount: customSalePrice * quantityToSell,
// //             costPrice: product.costPrice
// //         };

// //         sales[date] = sales[date] || { totalProfit: 0, details: [] };
// //         sales[date].details.push(saleDetail);
// //         sales[date].totalProfit += profit;

// //         localStorage.setItem('sales', JSON.stringify(sales));
// //         localStorage.setItem('products', JSON.stringify(products));
// //         displayProducts();
// //         displaySales();
// //     };

// //     window.sellProductOnCredit = (id) => {
// //         const product = products.find(p => p.id === id);
// //         const quantityToSell = parseInt(prompt(`Введите количество для продажи в долг (доступно: ${product.quantity}):`), 10);
// //         const customSalePrice = parseFloat(prompt(`Введите цену продажи в долг (текущая цена: ${product.salePrice.toFixed(2)}):`));

// //         if (isNaN(quantityToSell) || isNaN(customSalePrice) || quantityToSell > product.quantity || quantityToSell <= 0) {
// //             alert('Некорректное количество или цена. Попробуйте еще раз.');
// //             return;
// //         }

// //         product.quantity -= quantityToSell;
// //         const date = new Date().toLocaleDateString();
// //         const time = new Date().toLocaleTimeString();
// //         const saleDetail = {
// //             time,
// //             name: product.name,
// //             quantity: quantityToSell,
// //             salePrice: customSalePrice,
// //             isDebt: true,
// //             debtPaid: false,
// //             remainingDebt: customSalePrice * quantityToSell,
// //             paidAmount: 0,
// //             costPrice: product.costPrice
// //         };

// //         sales[date] = sales[date] || { totalProfit: 0, details: [] };
// //         sales[date].details.push(saleDetail);

// //         localStorage.setItem('sales', JSON.stringify(sales));
// //         localStorage.setItem('products', JSON.stringify(products));
// //         displayProducts();
// //         displaySales();
// //     };

// //     window.editProduct = (id) => {
// //         const product = products.find(p => p.id === id);
// //         document.getElementById('product-name').value = product.name;
// //         document.getElementById('product-quantity').value = product.quantity;
// //         document.getElementById('product-cost-price').value = product.costPrice;
// //         document.getElementById('product-sale-price').value = product.salePrice;
// //         deleteProduct(id);
// //     };

// //     window.deleteProduct = (id) => {
// //         products = products.filter(p => p.id !== id);
// //         localStorage.setItem('products', JSON.stringify(products));
// //         displayProducts();
// //     };

// //     function displaySales(searchTerm = '') {
// //         salesTable.innerHTML = '';
// //         Object.entries(sales).forEach(([date, { totalProfit, details }]) => {
// //             const row = document.createElement('tr');
// //             row.innerHTML = `
// //                 <td>${date}</td>
// //                 <td>${totalProfit.toFixed(2)}</td>
// //                 <td><button onclick="toggleDetails('${date}')">Подробнее</button></td>
// //             `;
// //             salesTable.appendChild(row);

// //             const detailsRow = document.createElement('tr');
// //             detailsRow.id = `details-${date}`;
// //             detailsRow.style.display = 'none';
// //             const detailsContent = details
// //                 .filter(detail =>
// //                     detail.time.includes(searchTerm) ||
// //                     detail.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //                     detail.quantity.toString().includes(searchTerm) ||
// //                     detail.salePrice.toString().includes(searchTerm) ||
// //                     (detail.isDebt ? 'Да' : 'Нет').includes(searchTerm) ||
// //                     (detail.debtPaid ? 'Нет' : 'Да').includes(searchTerm)
// //                 )
// //                 .map(detail => `
// //                     <div>
// //                         ${detail.time} ${detail.name} ${detail.quantity} ${detail.salePrice.toFixed(2)}
// //                         (${detail.isDebt ? 'Да' : 'Нет'}) 
// //                         <span>Неоплачено: ${detail.remainingDebt.toFixed(2)}</span>
// //                         ${detail.isDebt && detail.remainingDebt > 0 ? 
// //                             `<button onclick="payDebt('${date}', '${detail.time}')">Пришел оплатить</button>` 
// //                             : ''}
// //                     </div>
// //                 `).join('');
// //             detailsRow.innerHTML = `<td colspan="3">${detailsContent}</td>`;
// //             salesTable.appendChild(detailsRow);
// //         });
// //     }

// //     window.toggleDetails = (date) => {
// //         const detailsRow = document.getElementById(`details-${date}`);
// //         detailsRow.style.display = detailsRow.style.display === 'none' ? '' : 'none';
// //     };

// //     window.payDebt = (date, time) => {
// //         const sale = sales[date].details.find(detail => detail.time === time);
// //         if (!sale || !sale.isDebt || sale.remainingDebt <= 0) {
// //             alert('Долг уже оплачен или данные не найдены.');
// //             return;
// //         }

// //         // Полная оплата оставшегося долга
// //         const paymentAmount = sale.remainingDebt;
// //         sale.remainingDebt = 0;
// //         sale.paidAmount += paymentAmount;
// //         sale.debtPaid = true;

// //         // Добавляем прибыль от полной оплаты
// //         const profitToAdd = (sale.paidAmount / (sale.salePrice * sale.quantity)) * ((sale.salePrice - sale.costPrice) * sale.quantity);
// //         sales[date].totalProfit += profitToAdd;

// //         localStorage.setItem('sales', JSON.stringify(sales));
// //         displaySales();
// //     };

// //     displayProducts();
// //     displaySales();
// // });
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // document.addEventListener('DOMContentLoaded', () => {
// //     const form = document.getElementById('product-form');
// //     const productTable = document.getElementById('product-table').querySelector('tbody');
// //     const searchInput = document.getElementById('search-input');
// //     const salesTable = document.getElementById('sales-table').querySelector('tbody');
// //     const salesSearchInput = document.createElement('input');
// //     salesSearchInput.placeholder = "Поиск по продажам";
// //     document.body.insertBefore(salesSearchInput, salesTable.parentElement);

// //     let products = JSON.parse(localStorage.getItem('products')) || [];
// //     let sales = JSON.parse(localStorage.getItem('sales')) || {};

// //     form.addEventListener('submit', (e) => {
// //         e.preventDefault();

// //         const name = document.getElementById('product-name').value;
// //         const quantity = parseInt(document.getElementById('product-quantity').value, 10);
// //         const costPrice = parseFloat(document.getElementById('product-cost-price').value);
// //         const salePrice = parseFloat(document.getElementById('product-sale-price').value);

// //         const product = { name, quantity, costPrice, salePrice, id: Date.now() };

// //         products.push(product);
// //         localStorage.setItem('products', JSON.stringify(products));
// //         displayProducts();
// //         form.reset();
// //     });

// //     searchInput.addEventListener('input', () => {
// //         displayProducts(searchInput.value);
// //     });

// //     salesSearchInput.addEventListener('input', () => {
// //         displaySales(salesSearchInput.value);
// //     });

// //     function displayProducts(searchTerm = '') {
// //         productTable.innerHTML = '';
// //         products
// //             .filter(product =>
// //                 product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //                 product.quantity.toString().includes(searchTerm) ||
// //                 product.costPrice.toString().includes(searchTerm) ||
// //                 product.salePrice.toString().includes(searchTerm)
// //             )
// //             .forEach(product => {
// //                 const row = document.createElement('tr');
// //                 row.innerHTML = `
// //                     <td>${product.name}</td>
// //                     <td>${product.quantity}</td>
// //                     <td>${product.costPrice.toFixed(2)}</td>
// //                     <td>${product.salePrice.toFixed(2)}</td>
// //                     <td>
// //                         <button onclick="sellProduct(${product.id})">Продать</button>
// //                         <button onclick="sellProductOnCredit(${product.id})">Продать в долг</button>
// //                         <button onclick="editProduct(${product.id})">Редактировать</button>
// //                         <button onclick="deleteProduct(${product.id})">Удалить</button>
// //                     </td>
// //                 `;
// //                 productTable.appendChild(row);
// //             });
// //     }

// //     window.sellProduct = (id) => {
// //         const product = products.find(p => p.id === id);
// //         const quantityToSell = parseInt(prompt(`Введите количество для продажи (доступно: ${product.quantity}):`), 10);
// //         const customSalePrice = parseFloat(prompt(`Введите цену продажи (текущая цена: ${product.salePrice.toFixed(2)}):`));

// //         if (isNaN(quantityToSell) || isNaN(customSalePrice) || quantityToSell > product.quantity || quantityToSell <= 0) {
// //             alert('Некорректное количество или цена. Попробуйте еще раз.');
// //             return;
// //         }

// //         product.quantity -= quantityToSell;
// //         const profit = (customSalePrice - product.costPrice) * quantityToSell;
// //         const date = new Date().toLocaleDateString();
// //         const time = new Date().toLocaleTimeString();
// //         const saleDetail = {
// //             time,
// //             name: product.name,
// //             quantity: quantityToSell,
// //             salePrice: customSalePrice,
// //             isDebt: false,
// //             debtPaid: true,
// //             remainingDebt: 0,
// //             paidAmount: customSalePrice * quantityToSell,
// //             costPrice: product.costPrice
// //         };

// //         sales[date] = sales[date] || { totalProfit: 0, details: [] };
// //         sales[date].details.push(saleDetail);
// //         sales[date].totalProfit += profit;

// //         localStorage.setItem('sales', JSON.stringify(sales));
// //         localStorage.setItem('products', JSON.stringify(products));
// //         displayProducts();
// //         displaySales();
// //     };

// //     window.sellProductOnCredit = (id) => {
// //         const product = products.find(p => p.id === id);
// //         const buyerName = prompt("Введите имя покупателя, который покупает в долг:");
// //         const quantityToSell = parseInt(prompt(`Введите количество для продажи в долг (доступно: ${product.quantity}):`), 10);
// //         const customSalePrice = parseFloat(prompt(`Введите цену продажи в долг (текущая цена: ${product.salePrice.toFixed(2)}):`));

// //         if (!buyerName || isNaN(quantityToSell) || isNaN(customSalePrice) || quantityToSell > product.quantity || quantityToSell <= 0) {
// //             alert('Некорректное имя покупателя, количество или цена. Попробуйте еще раз.');
// //             return;
// //         }

// //         product.quantity -= quantityToSell;
// //         const date = new Date().toLocaleDateString();
// //         const time = new Date().toLocaleTimeString();
// //         const saleDetail = {
// //             time,
// //             name: product.name,
// //             quantity: quantityToSell,
// //             salePrice: customSalePrice,
// //             buyerName, // Имя покупателя
// //             isDebt: true,
// //             debtPaid: false,
// //             remainingDebt: customSalePrice * quantityToSell,
// //             paidAmount: 0,
// //             costPrice: product.costPrice
// //         };

// //         sales[date] = sales[date] || { totalProfit: 0, details: [] };
// //         sales[date].details.push(saleDetail);

// //         localStorage.setItem('sales', JSON.stringify(sales));
// //         localStorage.setItem('products', JSON.stringify(products));
// //         displayProducts();
// //         displaySales();
// //     };

// //     window.editProduct = (id) => {
// //         const product = products.find(p => p.id === id);
// //         document.getElementById('product-name').value = product.name;
// //         document.getElementById('product-quantity').value = product.quantity;
// //         document.getElementById('product-cost-price').value = product.costPrice;
// //         document.getElementById('product-sale-price').value = product.salePrice;
// //         deleteProduct(id);
// //     };

// //     window.deleteProduct = (id) => {
// //         products = products.filter(p => p.id !== id);
// //         localStorage.setItem('products', JSON.stringify(products));
// //         displayProducts();
// //     };

// //     function displaySales(searchTerm = '') {
// //         salesTable.innerHTML = '';
// //         Object.entries(sales).forEach(([date, { totalProfit, details }]) => {
// //             const row = document.createElement('tr');
// //             row.innerHTML = `
// //                 <td>${date}</td>
// //                 <td>${totalProfit.toFixed(2)}</td>
// //                 <td><button onclick="toggleDetails('${date}')">Подробнее</button></td>
// //             `;
// //             salesTable.appendChild(row);

// //             const detailsRow = document.createElement('tr');
// //             detailsRow.id = `details-${date}`;
// //             detailsRow.style.display = 'none';
// //             const detailsContent = details
// //                 .filter(detail =>
// //                     detail.time.includes(searchTerm) ||
// //                     detail.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //                     detail.quantity.toString().includes(searchTerm) ||
// //                     detail.salePrice.toString().includes(searchTerm) ||
// //                     (detail.isDebt ? 'Да' : 'Нет').includes(searchTerm) ||
// //                     (detail.debtPaid ? 'Нет' : 'Да').includes(searchTerm) ||
// //                     (detail.buyerName || '').toLowerCase().includes(searchTerm.toLowerCase()) // Фильтрация по имени покупателя
// //                 )
// //                 .map(detail => `
// //                     <div>
// //                         ${detail.time} ${detail.name} ${detail.quantity} ${detail.salePrice.toFixed(2)}
// //                         (${detail.isDebt ? 'Да' : 'Нет'}) Покупатель: ${detail.buyerName || 'Не указан'}
// //                         <span>Неоплачено: ${detail.remainingDebt.toFixed(2)}</span>
// //                         ${detail.isDebt && detail.remainingDebt > 0 ? 
// //                             `<button onclick="payDebt('${date}', '${detail.time}')">Пришел оплатить</button>` 
// //                             : ''}
// //                     </div>
// //                 `).join('');
// //             detailsRow.innerHTML = `<td colspan="3">${detailsContent}</td>`;
// //             salesTable.appendChild(detailsRow);
// //         });
// //     }

// //     window.toggleDetails = (date) => {
// //         const detailsRow = document.getElementById(`details-${date}`);
// //         detailsRow.style.display = detailsRow.style.display === 'none' ? '' : 'none';
// //     };

// //     window.payDebt = (date, time) => {
// //         const sale = sales[date].details.find(detail => detail.time === time);
// //         if (!sale || !sale.isDebt || sale.remainingDebt <= 0) {
// //             alert('Долг уже оплачен или данные не найдены.');
// //             return;
// //         }

// //         // Полная оплата оставшегося долга
// //         const paymentAmount = sale.remainingDebt;
// //         sale.remainingDebt = 0;
// //         sale.paidAmount += paymentAmount;
// //         sale.debtPaid = true; // Долг полностью оплачен

// //         // Добавление прибыли после полной оплаты
// //         const profitToAdd = sale.salePrice * sale.quantity - sale.costPrice * sale.quantity;
// //         sales[date].totalProfit += profitToAdd;

// //         localStorage.setItem('sales', JSON.stringify(sales));
// //         displaySales();
// //     };

// //     displayProducts();
// //     displaySales();
// // });

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // // Вариант с использованием импорт и экспорт данных

// const products = [];
// let sales = [];

// // === Yordamchi funksiyalar ===
// function fmtSom(val) {
//   return val.toLocaleString("uz-UZ") + " so‘m";
// }
// function fmtUsd(val) {
//   return "$" + val.toFixed(2);
// }
// function roundQty(q) {
//   const intPart = Math.floor(q);
//   const fraction = q - intPart;
//   return fraction >= 0.5 ? Math.ceil(q) : Math.floor(q);
// }
// function getGroup(name) {
//   if (name.toLowerCase().startsWith("luxury")) return "luxury";
//   if (name.toLowerCase().startsWith("golden")) return "golden";
//   if (name.toLowerCase().startsWith("art floor")) return "artfloor";
//   return "general";
// }

// // === Mahsulotlarni render qilish ===
// function renderProducts(filter = "") {
//   ["luxury", "golden", "artfloor", "general", "donali", "pachkali"].forEach(id => {
//     const tbl = document.getElementById(id + "-table");
//     if (tbl) tbl.innerHTML = "";
//   });

//   products.forEach((p, index) => {
//     if (filter && !p.code.toLowerCase().includes(filter.toLowerCase())) return;

//     const row = document.createElement("tr");

//     // Donali uchun m² chiqarilmasin
//     let quantityText = `${roundQty(p.quantity)} dona`;
//     if (p.category !== "donali") {
//       quantityText += ` (${p.totalArea.toFixed(3)} m²)`;
//     }

//     // Kvadrat sotish tugmasini faqat donali bo‘lmaganlarga chiqarish
//     let buttons = '';
//     if (p.category !== "donali") {
//       buttons += `<button onclick="sellByArea(${index})">Kvadrat sotish</button>`;
//     }

//     buttons += `
//       <button onclick="sellByPiece(${index})">Dona sotish</button>
//       <button onclick="editProduct(${index})">O‘zgartirish</button>
//       <button onclick="deleteProduct(${index})">O‘chirish</button>
//     `;

//     row.innerHTML = `
//       <td>${p.code}</td>
//       <td>${p.name}</td>
//       <td>${quantityText}</td>
//       <td>${fmtSom(p.costSom)} / ${fmtUsd(p.costUsd)}</td>
//       <td>${fmtSom(p.saleSom)} / ${fmtUsd(p.saleUsd)}</td>
//       <td>${buttons}</td>
//     `;

//     // Jadvalga qo‘shish
//     if (p.category === "donali") {
//       document.getElementById("donali-table").appendChild(row);
//     } else if (p.category === "pachkali") {
//       document.getElementById("pachkali-table").appendChild(row);
//     } else {
//       document.getElementById(getGroup(p.name) + "-table").appendChild(row);
//     }
//   });

//   renderRemain();
// }


// // === Omborda qolganlarni hisoblash ===
// function renderRemain() {
//   let totalQty = 0, totalArea = 0;
//   products.forEach((p) => {
//     totalQty += p.quantity;
//     totalArea += p.totalArea;
//   });
//   document.getElementById("remain-summary").innerHTML =
//     "Omborda qolgan jami: " + roundQty(totalQty) + " dona, " + totalArea.toFixed(3) + " m²";
// }

// // === Sotilganlarni render qilish ===
// function renderSales() {
//   const tbl = document.getElementById("sales-table");
//   tbl.innerHTML = "";

//   let totalQty = 0, totalArea = 0;
//   sales.forEach((s) => {
//     const tr = document.createElement("tr");
//     tr.innerHTML = `
//       <td>${s.time}</td>
//       <td>${s.name}</td>
//       <td>${roundQty(s.qty)} dona (${s.area.toFixed(3)} m²)</td>
//       <td>${fmtSom(s.sumSom)}</td>
//       <td>${fmtUsd(s.sumUsd)}</td>
//     `;
//     tbl.appendChild(tr);

//     totalQty += s.qty;
//     totalArea += s.area;
//   });

//   document.getElementById("sold-total").textContent = roundQty(totalQty) + " dona";
//   document.getElementById("sold-total-area").textContent = totalArea.toFixed(3) + " m²";
// }

// // === Mahsulot qo‘shish / o‘zgartirish ===
// document.getElementById("product-form").addEventListener("submit", function (e) {
//   e.preventDefault();

//   const idx = document.getElementById("edit-index")?.value || "";
//   const code = document.getElementById("product-code").value;
//   const name = document.getElementById("product-name").value;
//   const size = parseFloat(document.getElementById("product-size").value);
//   const qty = parseFloat(document.getElementById("product-quantity").value);
//   const costUsd = parseFloat(document.getElementById("product-cost-price-usd").value) || 0;
//   const saleUsd = parseFloat(document.getElementById("product-sale-price-usd").value) || 0;
//   const rate = parseFloat(document.getElementById("dollar-rate").value) || 12500;
//   const category = document.getElementById("product-category")?.value || "general";

//   const productData = {
//     code, name, size,
//     quantity: qty,
//     totalArea: qty * size,
//     costUsd,
//     costSom: costUsd * rate,
//     saleUsd,
//     saleSom: saleUsd * rate,
//     category
//   };

//   if (idx !== "") {
//     products[idx] = productData;
//     document.getElementById("edit-index").value = "";
//   } else {
//     products.push(productData);
//   }

//   renderProducts();
//   this.reset();
// });

// // === Kvadrat bo‘yicha sotish ===
// function sellByArea(index) {
//   const product = products[index];
//   let area = parseFloat(prompt("Sotiladigan miqdor (m²):", "1"));
//   if (!area || area > product.totalArea) return alert("Miqdor noto‘g‘ri!");

//   const qty = area / product.size;
//   product.totalArea -= area;
//   product.quantity -= qty;

//   addSale(product, qty, area);
// }

// // === Dona bo‘yicha sotish ===
// function sellByPiece(index) {
//   const product = products[index];
//   let qty = parseFloat(prompt("Sotiladigan miqdor (dona):", "1"));
//   if (!qty || qty > product.quantity) return alert("Miqdor noto‘g‘ri!");

//   const area = qty * product.size;
//   product.quantity -= qty;
//   product.totalArea -= area;

//   addSale(product, qty, area);
// }

// // === Sotilganlarni qo‘shish ===
// function addSale(product, qty, area) {
//   sales.push({
//     time: new Date().toLocaleTimeString(),
//     name: product.name,
//     qty,
//     area,
//     sumSom: qty * product.saleSom,
//     sumUsd: qty * product.saleUsd
//   });

//   renderProducts();
//   renderSales();
// }

// // === O‘zgartirish ===
// function editProduct(index) {
//   const p = products[index];
//   document.getElementById("edit-index").value = index;
//   document.getElementById("product-code").value = p.code;
//   document.getElementById("product-name").value = p.name;
//   document.getElementById("product-size").value = p.size;
//   document.getElementById("product-quantity").value = p.quantity;
//   document.getElementById("product-cost-price-usd").value = p.costUsd;
//   document.getElementById("product-sale-price-usd").value = p.saleUsd;
//   document.getElementById("dollar-rate").value = p.costSom / p.costUsd || 12500;
//   if (document.getElementById("product-category"))
//     document.getElementById("product-category").value = p.category;
// }

// // === O‘chirish ===
// function deleteProduct(index) {
//   if (confirm("Mahsulotni o‘chirishni xohlaysizmi?")) {
//     products.splice(index, 1);
//     renderProducts();
//   }
// }

// // === Kod qidirish ===
// document.getElementById("search-code").addEventListener("input", function () {
//   renderProducts(this.value);
// });

// // === PDF saqlash ===
// document.getElementById("save-pdf").addEventListener("click", function () {
//   const { jsPDF } = window.jspdf;
//   const doc = new jsPDF();

//   doc.setFontSize(14);
//   doc.text("Ombordagi mahsulotlar", 10, 10);

//   let y = 20;
//   products.forEach(p => {
//     doc.text(`${p.code} - ${p.name} - ${roundQty(p.quantity)} dona (${p.totalArea.toFixed(3)} m²)`, 10, y);
//     y += 8;
//   });

//   y += 10;
//   doc.text("Sotilgan mahsulotlar", 10, y);
//   y += 10;
//   sales.forEach(s => {
//     doc.text(`${s.time} - ${s.name} - ${roundQty(s.qty)} dona (${s.area.toFixed(3)} m²) - ${fmtSom(s.sumSom)}`, 10, y);
//     y += 8;
//   });

//   doc.save("hisobot.pdf");
// });

// // === Boshlang‘ich render ===
// renderProducts();
// renderSales();



// // Mavjud boshqa funksiyalar (masalan, mode) o‘zgartirmadim, agar kerak bo‘lsa ayting



// // экспорт пока не работает :(
// // function exportSales() {
// //     try {
// //         const salesData = JSON.stringify(sales, null, 2);
// //         const blob = new Blob([salesData], { type: 'application/json' });
// //         const url = URL.createObjectURL(blob);
// //         const a = document.createElement('a');
// //         a.href = url;
// //         a.download = 'sales_data.json';
// //         document.body.appendChild(a);
// //         a.click();
// //         document.body.removeChild(a);
// //         URL.revokeObjectURL(url);
// //         console.log('Экспорт данных успешен.');
// //     } catch (e) {
// //         console.error('Ошибка при экспорте данных:', e);
// //         alert('Ошибка при экспорте данных.');
// //     }
// // }