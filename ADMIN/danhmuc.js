document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch categories from JSON Server
    function fetchCategories() {
        fetch('http://localhost:3000/categories')
            .then(response => response.json())
            .then(data => {
                displayCategories(data);
            })
            .catch(error => console.error('Error fetching categories:', error));
    }

    // Function to display categories on the page
    function displayCategories(categories) {
        const tbody = document.querySelector('.table-data tbody');
        tbody.innerHTML = '';

        categories.forEach((category, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${category.name}</td>
                <td>
                    <button class="edit-btn" data-id="${category.id}">Sửa</button>
                    <button class="delete-btn" data-id="${category.id}">Xóa</button>
                </td>
            `;
            tbody.appendChild(row);
        });

        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const categoryId = button.getAttribute('data-id');
                deleteCategory(categoryId);
            });
        });

        const editButtons = document.querySelectorAll('.edit-btn');
        editButtons.forEach(button => {
            button.addEventListener('click', () => {
                const categoryId = button.getAttribute('data-id');
                const categoryName = button.parentElement.previousElementSibling.textContent;
                showEditForm(categoryId, categoryName);
            });
        });
    }

    // Function to delete a category
    function deleteCategory(categoryId) {
        fetch(`http://localhost:3000/categories/${categoryId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    fetchCategories();
                } else {
                    throw new Error('Failed to delete category');
                }
            })
            .catch(error => console.error('Error deleting category:', error));
    }

    // Function to show edit form
    function showEditForm(categoryId, categoryName) {
        const editForm = document.getElementById('editCategoryForm');
        const newCategoryNameInput = editForm.querySelector('input[name="newCategoryName"]');
        newCategoryNameInput.value = categoryName;

        editForm.style.display = 'block';

        editForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const newCategoryName = newCategoryNameInput.value;

            fetch(`http://localhost:3000/categories/${categoryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: newCategoryName })
            })
            .then(response => {
                if (response.ok) {
                    fetchCategories();
                    editForm.reset();
                    editForm.style.display = 'none';
                } else {
                    throw new Error('Failed to edit category');
                }
            })
            .catch(error => console.error('Error editing category:', error));
        });
    }

    // Toggle add category form
    const addCategoryForm = document.getElementById('addCategoryForm');
    const toggleCategoryFormButton = document.getElementById('toggleCategoryForm');
    toggleCategoryFormButton.addEventListener('click', function () {
        if (addCategoryForm.style.display === 'none') {
            addCategoryForm.style.display = 'block';
        } else {
            addCategoryForm.style.display = 'none';
        }
    });

    // Handle adding new category
    addCategoryForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const categoryName = document.querySelector('input[name="categoryName"]').value;
        const newCategory = { name: categoryName };

        fetch('http://localhost:3000/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCategory)
        })
            .then(response => {
                if (response.ok) {
                    fetchCategories();
                    addCategoryForm.reset();
                    addCategoryForm.style.display = 'none';
                } else {
                    throw new Error('Failed to add category');
                }
            })
            .catch(error => console.error('Error adding category:', error));
    });

    // Fetch categories on page load
    fetchCategories();
});
