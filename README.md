# Hacker News Reader – Technical Assessment

A high-performance Hacker News client built with React Native CLI. I focused on creating a "snappy" feel—optimizing for 60 FPS scrolling and ensuring that data is available instantly, even when the user is deep in a subway tunnel or on airplane mode.

## 🛠 Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Android**:
    * Fire up an emulator (API 30+).
    * Run `npx react-native run-android`.
3.  **iOS**:
    * `cd ios && pod install && cd ..`
    * Run `npx react-native run-ios`.
4.  **Tests**:
    * `npm test` runs the Jest and RNTL suites I’ve set up for logic and interaction validation.

---

## 🏗 My Architectural Approach

### **State Management: Why Zustand?**
I decided to go with **Zustand** over Redux Toolkit. While Redux is great for massive enterprise apps, it often introduces a lot of "boilerplate noise." For this project, I wanted a store that was easy to read and highly performant. Zustand’s hooks-based API allowed me to keep the logic for fetching stories and managing bookmarks separate and clean without the overhead of actions and reducers.

### **Data Persistence: Choosing MMKV**
I swapped out the standard `AsyncStorage` for **MMKV**. 
* **The Reason**: `AsyncStorage` is asynchronous, which often leads to a "flicker" where the UI shows an empty state for a split second while the data loads. Because MMKV uses JSI to talk to C++ directly, I can read the user's bookmarks **synchronously** as the app starts. It makes the app feel native and expensive.

### **Performance Optimization**
I spent extra time on the `FlatList` configuration. By using `getItemLayout`, I’ve told the list exactly how tall every row is. This prevents the "jumping" behavior you sometimes see when scrolling through long lists, as the list doesn't have to calculate dimensions on the fly.

---

## 📝 Section 02: Technical Deep-Dive

**1. Bridge vs. JSI**
The old **Bridge** was like sending a letter through the mail—you had to bundle your data into a JSON string, send it over, and wait for the other side to unpack it. It’s inherently asynchronous. **JSI (JavaScript Interface)** is like having a direct conversation. It lets JavaScript call C++ methods directly. This is why libraries like Reanimated (which I used for the swipe gestures) feel so much smoother now.

**2. Taming the FlatList**
Beyond the basic `keyExtractor`, I used `initialNumToRender` to make sure the first screenful of data pops up instantly. I also wrapped the `ArticleCard` in `React.memo` to ensure that if I sort the list or update a single item, the entire list doesn't struggle to re-render.

**3. `useCallback` vs. `useMemo`**
I use `useMemo` as a "cache" for expensive data—like the filtered and sorted list of stories. It ensures I’m not re-sorting 500 items every time a user types a single letter in the search bar. I use `useCallback` for functions passed to child components to keep their "identity" stable, preventing those children from re-rendering for no reason.

**4. Why this State Choice?**
Zustand was the right tool for the job here. It’s lightweight (under 2kb) and doesn't wrap the whole app in a Provider, which makes testing and maintenance much simpler. It gave me the power of global state with the simplicity of local hooks.

**5. Designing for the "Offline" World**
A mobile app shouldn't just "break" when the Wi-Fi drops. I implemented a three-tier strategy: 
1. **Visibility**: A non-intrusive banner appears when NetInfo detects a loss of signal.
2. **Persistence**: Bookmarks are saved to MMKV so they are always there.
3. **Graceful Failure**: If a fetch fails, the user sees a friendly error state with a "Retry" button rather than just a white screen.
