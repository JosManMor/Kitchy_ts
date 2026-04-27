# Kitchy - Recipe Platform Documentation

---

## 🏗️ System Components

### 1. Navigation & Layout

#### Responsive Sidebar (Burger Menu)

A collapsible sidebar accessible via a burger icon. It contains:

- **Home:** Trending recipes feed.
- **Saved:** Bookmarked content.
- **Account:** User profile management.
- **Settings:** Application preferences.
- **Chef Panel:** Exclusive management section for verified Chefs to create recipes.
- **Log Out:** Session termination.

#### Styling

All components are to be built using **Tailwind CSS** utility classes for rapid UI development and responsiveness.

---

### 2. Main Dashboard (Recipe Feed)

#### Integrated Search

A simplified search bar located at the top of the main page, restricted to searching specifically by **recipe name**.

#### Grid Layout

Responsive display showing exactly **three recipes per row** on desktop views.

#### Recipe Card

Each recipe card must contain:

- **Visuals:** High-quality food image.
- **Interactions:**
  - Like Toggle (Heart icon) with counter display.
  - Save icon (Bookmark).
- **Metadata:**
  - Recipe title.
  - Country identifier (flag icon or country label indicating the cuisine origin).
  - Preparation time.
  - Difficulty level.
- **Primary Action:** `View Recipe` button.

---

### 3. Recipe Details

#### Header

Displays:

- Category tag
- Recipe title
- Country identifier showing the recipe's origin cuisine

#### Ingredients

Structured grid list of ingredients.

#### Instructions

A numbered list where each step is accompanied by a **process image** to visually illustrate the cooking technique.

#### Summary Bar

Bottom-fixed information bar indicating:

- Time
- Servings
- Difficulty

---

### 4. Chef Creation Tool

#### Functional Module

A form-based interface exclusive to the **Chef Panel**.

#### Capabilities

Allows verified Chefs to:

- Input recipe titles
- Select the country/origin of the recipe
- Upload process images for instructions
- List ingredients
- Define step-by-step elaboration

---

## 📝 User Stories

| ID   | User Role | Requirement                                                    | Goal / Benefit                                                                           |
| ---- | --------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| US.1 | User      | I want to view recipes in a 3-column grid                      | To quickly browse multiple options without excessive scrolling.                          |
| US.2 | User      | I want to toggle a "Like" button on a recipe card              | To express my preference and see the total popularity of a dish.                         |
| US.3 | User      | I want to search for recipes by name directly on the main page | To find a particular dish I already have in mind without leaving the feed.               |
| US.4 | User      | I want to see images for each step of the cooking process      | To better understand the technique and ensure I am following the instructions correctly. |
| US.5 | Chef      | I want to access a "Create Recipe" component in the sidebar    | To share my culinary knowledge and add new content to the platform.                      |
| US.6 | User      | I want to access navigation links via a burger menu            | To have a clean interface that maximizes screen space for recipe browsing.               |
| US.7 | User      | I want to identify the country of origin of each recipe        | To explore international cuisine and recognize the cultural source of the dish.          |

---
