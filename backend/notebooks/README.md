# LuminaStay Jupyter Notebooks

This directory contains Jupyter notebooks for data analysis, model training, and evaluation.

## 📚 Notebooks Overview

### 1. `data_exploration.ipynb`
**Purpose**: Comprehensive exploratory data analysis (EDA) of the Morocco housing dataset.

**Contents**:
- Dataset overview and statistics
- Price distribution analysis
- City and property type comparisons
- Correlation analysis
- Geographic visualization
- Amenity impact analysis

**Key Visualizations**:
- Price distributions (histogram, box plot, violin plot)
- Price by city and property type
- Correlation heatmap
- Size vs price scatter plot
- Geographic distribution map
- Amenity impact charts

**Run Time**: ~2-3 minutes

---

### 2. `model_comparison.ipynb`
**Purpose**: Compare multiple ML algorithms to select the best model for housing price prediction.

**Models Compared**:
1. **Linear Regression** - Baseline linear model
2. **Ridge Regression** - Linear with L2 regularization
3. **Lasso Regression** - Linear with L1 regularization (feature selection)
4. **K-Nearest Neighbors** - Distance-based prediction
5. **Support Vector Machine (SVM)** - Kernel-based regression
6. **Random Forest** - Ensemble of decision trees
7. **Gradient Boosting** - Sequential ensemble learning
8. **Neural Network (MLP)** - Deep learning approach

**Evaluation Metrics**:
- Mean Absolute Error (MAE)
- Root Mean Squared Error (RMSE)
- R² Score
- Mean Absolute Percentage Error (MAPE)
- Cross-Validation MAE
- Training Time

**Key Visualizations**:
- MAE comparison bar chart
- R² score comparison
- Multi-metric dashboard
- Model type analysis

**Run Time**: ~5-10 minutes (depending on dataset size)

---

### 3. `model_evaluation.ipynb`
**Purpose**: Detailed evaluation of the trained model with comprehensive metrics and visualizations.

**Contents**:
- Performance metrics (train vs test)
- Actual vs predicted analysis
- Residual analysis
- Feature importance
- Error analysis by city and property type
- Cross-validation results
- Best and worst predictions

**Key Visualizations**:
- Actual vs predicted scatter plot
- Residual plot
- Error distribution (histogram + box plot)
- Feature importance chart
- Error by city box plot
- Error by property type box plot
- Cross-validation scores

**Run Time**: ~3-5 minutes

---

## 🚀 Getting Started

### Prerequisites
```bash
# Install required packages
pip install -r ../requirements.txt
```

### Running Notebooks

**Option 1: Jupyter Notebook**
```bash
# Navigate to backend directory
cd backend

# Start Jupyter Notebook
jupyter notebook

# Open any notebook from the browser interface
```

**Option 2: Jupyter Lab** (Recommended)
```bash
# Install Jupyter Lab (if not already installed)
pip install jupyterlab

# Start Jupyter Lab
jupyter lab

# Navigate to notebooks/ directory in the sidebar
```

**Option 3: VS Code**
1. Install the "Jupyter" extension in VS Code
2. Open any `.ipynb` file
3. Click "Run All" or run cells individually

---

## 📊 Recommended Execution Order

For best results, run notebooks in this order:

1. **`data_exploration.ipynb`** - Understand the dataset first
2. **`model_comparison.ipynb`** - Compare models and select the best one
3. **`model_evaluation.ipynb`** - Evaluate the selected model in detail

---

## 📁 Output Files

Running these notebooks will generate the following visualization files:

### From `data_exploration.ipynb`:
- `price_distribution.png`
- `price_by_city.png`
- `price_by_property_type.png`
- `correlation_heatmap.png`
- `size_vs_price.png`
- `feature_distributions.png`
- `geographic_distribution.png`
- `amenities_impact.png`

### From `model_comparison.ipynb`:
- `model_comparison_mae.png`
- `model_comparison_r2.png`
- `model_comparison_dashboard.png`
- `model_type_comparison.png`
- `model_comparison_results.csv`
- `model_best.pkl` (best model saved)

### From `model_evaluation.ipynb`:
- `actual_vs_predicted.png`
- `residual_plot.png`
- `error_distribution.png`
- `feature_importance.png`
- `error_by_city.png`
- `error_by_property_type.png`
- `cv_scores.png`

**Note**: All PNG files are saved at 300 DPI for high-quality presentation slides.

---

## 💡 Tips for Presentation

### Using Visualizations in Slides
1. All charts are saved as high-resolution PNGs (300 DPI)
2. Insert them directly into PowerPoint/Google Slides
3. Recommended slide dimensions: 16:9 aspect ratio

### Key Metrics to Highlight
- **MAE**: Average prediction error in MAD
- **R² Score**: Percentage of variance explained
- **MAPE**: Average percentage error
- **CV MAE**: Cross-validation score (model consistency)

### Talking Points
- **Data Exploration**: "Our dataset contains 5,000 properties across 4 major Moroccan cities..."
- **Model Comparison**: "We evaluated 8 different algorithms and found that [best model] performs best..."
- **Model Evaluation**: "Our model achieves an R² of [X.XX], explaining [XX]% of price variance..."

---

## 🔧 Troubleshooting

### Issue: Kernel not found
**Solution**:
```bash
python -m ipykernel install --user --name=lumina_stay
```

### Issue: Module not found
**Solution**:
```bash
pip install -r ../requirements.txt
```

### Issue: Plots not displaying
**Solution**: Add this at the top of the notebook:
```python
%matplotlib inline
```

### Issue: Out of memory
**Solution**: Reduce dataset size or use a smaller subset for testing:
```python
df = df.sample(n=1000, random_state=42)  # Use 1000 samples instead
```

---

## 📝 Customization

### Changing Color Schemes
All notebooks use seaborn color palettes. To change:
```python
sns.set_palette("Set2")  # Options: Set1, Set2, Set3, husl, etc.
```

### Adjusting Figure Sizes
```python
plt.rcParams['figure.figsize'] = (14, 7)  # Width, Height in inches
```

### Saving Plots with Different DPI
```python
plt.savefig('filename.png', dpi=150)  # Lower DPI for faster saving
```

---

## 🎓 Academic Use

These notebooks are designed for the **Basics of Computer Science Final Project**. They provide:

✅ **Comprehensive Analysis** - Meets all project requirements  
✅ **Professional Visualizations** - Ready for presentation  
✅ **Detailed Documentation** - Clear explanations throughout  
✅ **Reproducible Results** - Fixed random seeds for consistency  

---

## 📚 Additional Resources

- [Scikit-learn Documentation](https://scikit-learn.org/stable/)
- [Pandas Documentation](https://pandas.pydata.org/docs/)
- [Matplotlib Gallery](https://matplotlib.org/stable/gallery/index.html)
- [Seaborn Tutorial](https://seaborn.pydata.org/tutorial.html)

---

## ✅ Checklist for Presentation

Before your presentation, ensure you have:

- [ ] Run all three notebooks successfully
- [ ] Saved all visualization PNG files
- [ ] Reviewed model comparison results
- [ ] Noted the best model and its metrics
- [ ] Prepared talking points for each visualization
- [ ] Tested that all images display correctly in slides
- [ ] Backed up all files

---

**Good luck with your presentation! 🚀🇲🇦**
