/**
 * Gestion de Bibliothèque — script.js
 * Fonctionnalités : chargement XML, affichage, ajout, modification, suppression, recherche, modals
 */

// ─── État global ────────────────────────────────────────────────────────────
let books = [];          // tableau des livres (objets JS)
let deleteTarget = -1;   // index du livre en attente de suppression

// ─── Initialisation ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', loadXML);

// ─── Chargement XML ─────────────────────────────────────────────────────────
function loadXML() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'books.xml', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    if (xhr.status === 200 || xhr.status === 0) {
      parseXML(xhr.responseXML);
    } else {
      showError('Impossible de charger books.xml (code ' + xhr.status + ')');
    }
  };
  xhr.onerror = function () {
    showError('Erreur r\u00e9seau lors du chargement de books.xml.');
  };
  xhr.send();
}

function parseXML(xmlDoc) {
  if (!xmlDoc) {
    showError('Le fichier XML est invalide ou vide.');
    return;
  }
  const bookNodes = xmlDoc.getElementsByTagName('book');
  books = [];
  for (let i = 0; i < bookNodes.length; i++) {
    books.push(extractBook(bookNodes[i]));
  }
  renderTable(books);
}

function extractBook(node) {
  return {
    title:  getText(node, 'title'),
    author: getText(node, 'author'),
    year:   getText(node, 'year'),
    price:  getText(node, 'price'),
    cover:  getText(node, 'cover'),
  };
}

function getText(node, tag) {
  const el = node.getElementsByTagName(tag)[0];
  return el ? el.textContent.trim() : '';
}

// ─── Affichage du tableau ────────────────────────────────────────────────────
function renderTable(list) {
  const tbody = document.getElementById('booksBody');
  tbody.innerHTML = '';

  if (list.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="empty-cell"><i class="fa-solid fa-inbox"></i> Aucun livre trouvé.</td></tr>';
    updateCount(0);
    return;
  }

  list.forEach(function (book, idx) {
    const globalIdx = books.indexOf(book);
    const row = document.createElement('tr');
    row.innerHTML = buildRow(book, idx + 1, globalIdx);
    tbody.appendChild(row);
  });

  updateCount(list.length);
}

function buildRow(book, displayNum, globalIdx) {
  const coverHtml = book.cover
    ? `<img src="${escapeHtml(book.cover)}" alt="couverture" class="book-cover-thumb"
           onerror="this.outerHTML='<div class=\'cover-placeholder\'><i class=\'fa-solid fa-book\'></i></div>'" />`
    : `<div class="cover-placeholder"><i class="fa-solid fa-book"></i></div>`;

  return `
    <td><span class="row-num">${displayNum}</span></td>
    <td>${coverHtml}</td>
    <td><strong>${escapeHtml(book.title)}</strong></td>
    <td>${escapeHtml(book.author)}</td>
    <td>${escapeHtml(book.year)}</td>
    <td>${escapeHtml(book.price)}</td>
    <td>
      <div class="actions-cell">
        <button class="btn btn-primary btn-icon" title="Détails" onclick="openDetailModal(${globalIdx})"><i class="fa-solid fa-eye"></i></button>
        <button class="btn btn-secondary btn-icon" title="Modifier" onclick="openEditModal(${globalIdx})"><i class="fa-solid fa-pen"></i></button>
        <button class="btn btn-danger btn-icon" title="Supprimer" onclick="openDeleteModal(${globalIdx})"><i class="fa-solid fa-trash"></i></button>
      </div>
    </td>`;
}

function updateCount(n) {
  document.getElementById('bookCount').textContent =
    n === 0 ? 'Aucun livre dans la bibliothèque'
            : n + ' livre' + (n > 1 ? 's' : '') + ' dans la bibliothèque';
}

// ─── Recherche / filtre ──────────────────────────────────────────────────────
function filterBooks() {
  const query = document.getElementById('searchInput').value.trim().toLowerCase();
  const filtered = query
    ? books.filter(b => b.title.toLowerCase().includes(query))
    : books;
  renderTable(filtered);
}

// ─── Modal Détails ───────────────────────────────────────────────────────────
function openDetailModal(idx) {
  const book = books[idx];
  document.getElementById('detailTitle').textContent  = book.title;
  document.getElementById('detailAuthor').textContent = book.author;
  document.getElementById('detailYear').textContent   = book.year;
  document.getElementById('detailPrice').textContent  = book.price;

  const img = document.getElementById('detailCover');
  if (book.cover) {
    img.src = book.cover;
    img.style.display = 'block';
    img.onerror = function () { this.style.display = 'none'; };
  } else {
    img.style.display = 'none';
  }

  openModal('detailModal');
}

// ─── Modal Ajout ─────────────────────────────────────────────────────────────
function openAddModal() {
  document.getElementById('formModalTitle').textContent = 'Ajouter un livre';
  document.getElementById('formSubmitBtn').textContent  = 'Ajouter';
  document.getElementById('editIndex').value = '-1';
  document.getElementById('bookForm').reset();
  openModal('formModal');
}

// ─── Modal Modification ───────────────────────────────────────────────────────
function openEditModal(idx) {
  const book = books[idx];
  document.getElementById('formModalTitle').textContent = 'Modifier le livre';
  document.getElementById('formSubmitBtn').textContent  = 'Enregistrer';
  document.getElementById('editIndex').value  = idx;
  document.getElementById('inputTitle').value  = book.title;
  document.getElementById('inputAuthor').value = book.author;
  document.getElementById('inputYear').value   = book.year;
  document.getElementById('inputPrice').value  = book.price;
  document.getElementById('inputCover').value  = book.cover;
  openModal('formModal');
}

// ─── Soumission formulaire (ajout ou modification) ───────────────────────────
function submitBookForm(e) {
  e.preventDefault();

  const idx   = parseInt(document.getElementById('editIndex').value, 10);
  const book  = {
    title:  document.getElementById('inputTitle').value.trim(),
    author: document.getElementById('inputAuthor').value.trim(),
    year:   document.getElementById('inputYear').value.trim(),
    price:  document.getElementById('inputPrice').value.trim(),
    cover:  document.getElementById('inputCover').value.trim(),
  };

  if (idx === -1) {
    books.push(book);
    showToast('Livre ajouté avec succès !', 'success');
  } else {
    books[idx] = book;
    showToast('Livre modifié avec succès !', 'success');
  }

  closeModal('formModal');
  renderTable(getFilteredBooks());
}

// ─── Modal Suppression ────────────────────────────────────────────────────────
function openDeleteModal(idx) {
  deleteTarget = idx;
  document.getElementById('deleteBookTitle').textContent = '"' + books[idx].title + '"';
  openModal('deleteModal');
}

function confirmDelete() {
  if (deleteTarget < 0 || deleteTarget >= books.length) return;
  books.splice(deleteTarget, 1);
  deleteTarget = -1;
  closeModal('deleteModal');
  showToast('Livre supprimé.', 'success');
  renderTable(getFilteredBooks());
}

// ─── Helpers modals ───────────────────────────────────────────────────────────
function openModal(id) {
  document.getElementById(id).classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

function closeModalOnOverlay(event, id) {
  if (event.target === document.getElementById(id)) {
    closeModal(id);
  }
}

// ─── Helpers divers ───────────────────────────────────────────────────────────
function getFilteredBooks() {
  const query = document.getElementById('searchInput').value.trim().toLowerCase();
  return query ? books.filter(b => b.title.toLowerCase().includes(query)) : books;
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showError(msg) {
  const tbody = document.getElementById('booksBody');
  tbody.innerHTML = `<tr><td colspan="7" class="loading-cell" style="color:#ef4444;">⚠️ ${escapeHtml(msg)}</td></tr>`;
}

// ─── Toast ────────────────────────────────────────────────────────────────────
let toastTimer = null;

function showToast(msg, type) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className   = 'toast show ' + (type || '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.className = 'toast';
  }, 3000);
}
