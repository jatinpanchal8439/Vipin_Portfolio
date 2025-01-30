// Color Palette Generator
const colorPresets = {
    modern: ['#2C3E50', '#E74C3C', '#ECF0F1', '#3498DB', '#2ECC71'],
    rustic: ['#8B4513', '#DEB887', '#F5DEB3', '#D2691E', '#A0522D'],
    minimalist: ['#FFFFFF', '#000000', '#CCCCCC', '#666666', '#999999'],
    tropical: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD']
};

function generatePalette() {
    const colors = [];
    for (let i = 0; i < 5; i++) {
        const hue = Math.floor(Math.random() * 360);
        const saturation = 25 + Math.floor(Math.random() * 50);
        const lightness = 30 + Math.floor(Math.random() * 40);
        colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }
    updateColorBoxes(colors);
}

function updateColorBoxes(colors) {
    colors.forEach((color, index) => {
        const box = document.getElementById(`color${index + 1}`);
        box.style.backgroundColor = color;
        box.setAttribute('data-color', color);
    });
}

function savePalette() {
    const colors = [];
    for (let i = 1; i <= 5; i++) {
        const box = document.getElementById(`color${i}`);
        colors.push(box.getAttribute('data-color'));
    }
    localStorage.setItem('savedPalette', JSON.stringify(colors));
    alert('Palette saved successfully!');
}

function loadPreset(presetName) {
    const colors = colorPresets[presetName];
    if (colors) {
        updateColorBoxes(colors);
    }
}

// Furniture Planner
let furnitureItems = [];

function addFurnitureItem() {
    const itemsContainer = document.getElementById('furnitureItems');
    const itemId = Date.now();
    
    const itemHTML = `
        <div class="furniture-item" id="item-${itemId}">
            <div class="input-group">
                <label>Item Name:</label>
                <input type="text" onchange="updateSpaceCalculation()" placeholder="e.g., Sofa">
            </div>
            <div class="input-group">
                <label>Length (ft):</label>
                <input type="number" onchange="updateSpaceCalculation()" min="0" step="0.1">
            </div>
            <div class="input-group">
                <label>Width (ft):</label>
                <input type="number" onchange="updateSpaceCalculation()" min="0" step="0.1">
            </div>
            <button onclick="removeFurnitureItem(${itemId})" class="remove-btn">
                <i class="fas fa-trash"></i> Remove
            </button>
        </div>
    `;
    
    itemsContainer.insertAdjacentHTML('beforeend', itemHTML);
    updateSpaceCalculation();
}

function removeFurnitureItem(itemId) {
    const item = document.getElementById(`item-${itemId}`);
    item.remove();
    updateSpaceCalculation();
}

function updateSpaceCalculation() {
    const roomLength = parseFloat(document.getElementById('roomLength').value) || 0;
    const roomWidth = parseFloat(document.getElementById('roomWidth').value) || 0;
    const totalArea = roomLength * roomWidth;
    
    let furnitureArea = 0;
    document.querySelectorAll('.furniture-item').forEach(item => {
        const length = parseFloat(item.querySelector('input[type="number"]:nth-of-type(1)').value) || 0;
        const width = parseFloat(item.querySelector('input[type="number"]:nth-of-type(2)').value) || 0;
        furnitureArea += length * width;
    });
    
    const availableSpace = totalArea - furnitureArea;
    const spaceUsagePercentage = (furnitureArea / totalArea) * 100;
    
    document.getElementById('totalArea').textContent = totalArea.toFixed(2);
    document.getElementById('furnitureArea').textContent = furnitureArea.toFixed(2);
    document.getElementById('availableSpace').textContent = availableSpace.toFixed(2);
    document.getElementById('spaceMeter').style.width = `${Math.min(spaceUsagePercentage, 100)}%`;
}

// Budget Calculator
let expenseCategories = [];

function addExpenseCategory() {
    const categoriesContainer = document.getElementById('expenseCategories');
    const categoryId = Date.now();
    
    const categoryHTML = `
        <div class="category-item" id="category-${categoryId}">
            <div class="input-group">
                <label>Category Name:</label>
                <input type="text" onchange="updateBudgetCalculation()" placeholder="e.g., Furniture">
            </div>
            <div class="input-group">
                <label>Estimated Cost ($):</label>
                <input type="number" onchange="updateBudgetCalculation()" min="0">
            </div>
            <button onclick="removeExpenseCategory(${categoryId})" class="remove-btn">
                <i class="fas fa-trash"></i> Remove
            </button>
        </div>
    `;
    
    categoriesContainer.insertAdjacentHTML('beforeend', categoryHTML);
    updateBudgetCalculation();
}

function removeExpenseCategory(categoryId) {
    const category = document.getElementById(`category-${categoryId}`);
    category.remove();
    updateBudgetCalculation();
}

function updateBudgetCalculation() {
    const totalBudget = parseFloat(document.getElementById('totalBudget').value) || 0;
    let totalPlanned = 0;
    
    document.querySelectorAll('.category-item').forEach(category => {
        const cost = parseFloat(category.querySelector('input[type="number"]').value) || 0;
        totalPlanned += cost;
    });
    
    const remaining = totalBudget - totalPlanned;
    const usagePercentage = (totalPlanned / totalBudget) * 100;
    
    document.getElementById('totalPlanned').textContent = `$${totalPlanned.toLocaleString()}`;
    document.getElementById('remainingBudget').textContent = `$${remaining.toLocaleString()}`;
    document.getElementById('budgetMeter').style.width = `${Math.min(usagePercentage, 100)}%`;
}

// Initialize the tools
document.addEventListener('DOMContentLoaded', () => {
    generatePalette();
    addFurnitureItem();
    addExpenseCategory();
    updateSpaceCalculation();
    updateBudgetCalculation();
});
