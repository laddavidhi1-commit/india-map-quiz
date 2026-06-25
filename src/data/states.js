export const regionColors = {
  "Jammu and Kashmir":  "#D5E8D4", "Ladakh":             "#E8D5B7",
  "Himachal Pradesh":   "#C8E6C9", "Uttarakhand":        "#B8D4E0",
  "Punjab":             "#FAE3A0", "Haryana":            "#FAE3A0",
  "Delhi":              "#F4B8BC", "Rajasthan":          "#F9D97A",
  "Uttar Pradesh":      "#FDDCB5", "Bihar":              "#FDDCB5",
  "Sikkim":             "#B2DFDB", "West Bengal":        "#D7BDE2",
  "Arunachal Pradesh":  "#B2DFDB", "Assam":              "#9FE1CB",
  "Nagaland":           "#B2DFDB", "Manipur":            "#B2DFDB",
  "Mizoram":            "#B2DFDB", "Tripura":            "#B2DFDB",
  "Meghalaya":          "#B2DFDB", "Jharkhand":          "#D7BDE2",
  "Odisha":             "#D7BDE2", "Chhattisgarh":       "#FFCBA4",
  "Madhya Pradesh":     "#FFCBA4", "Gujarat":            "#F5C97A",
  "Maharashtra":        "#F4A9A8", "Goa":                "#A8D8EA",
  "Karnataka":          "#A8D8EA", "Telangana":          "#C5E1A5",
  "Andhra Pradesh":     "#C5E1A5", "Tamil Nadu":         "#B5EAD7",
  "Kerala":             "#80CBC4", "Puducherry":         "#B5EAD7",
  "Lakshadweep":        "#AED9E0",
  "Andaman and Nicobar Islands": "#AED9E0",
  "Chandigarh":         "#FAE3A0", "Dadra and Nagar Haveli and Daman and Diu": "#F5C97A",
  "Daman and Diu":      "#F5C97A", "Dadra and Nagar Haveli": "#F5C97A",
};

export const stateInfo = {
  "Rajasthan": {
    icon: "🐪", capital: "Jaipur", pop: "68.5M", area: "342,239 km²", lang: "Rajasthani · Hindi",
    region: "Northwest India",
    geo: "India's largest state. The Thar Desert — world's most populous desert — covers the west. The Aravalli Range (oldest mountains on Earth at 3.5 billion years) runs northeast to southwest. The Luni river is the only major river, draining to the Rann of Kutch.",
    history: "Home to 36 Rajput clans who built magnificent forts — Chittorgarh, Mehrangarh, Amber. The Mughal Empire failed to fully subdue Rajputana for 200 years. Jaipur (the Pink City) was founded in 1727 by Maharaja Jai Singh II on a grid plan — one of India's first planned cities.",
    weather: { summer: "48°C", winter: "5°C", rain: "100–400mm", best: "Oct – Feb" },
    demog: "Predominantly Hindu (89%). Significant Jain minority who control much of the gem & textile trade. Literacy at 66.1%. Large pastoral communities (Bhil, Meena tribes).",
    tags: ["Thar Desert", "Rajput heritage", "Jaipur Pink City", "Camel safaris", "Pushkar mela"],
    cities: [
      { name: "Jaipur", pop: "3.1M", capital: true, lat: 26.91, lng: 75.79, icon: "🏯" },
      { name: "Jodhpur", pop: "1.1M", capital: false, lat: 26.29, lng: 73.02, icon: "🔵" },
      { name: "Udaipur", pop: "0.47M", capital: false, lat: 24.57, lng: 73.69, icon: "⛲" },
      { name: "Jaisalmer", pop: "0.09M", capital: false, lat: 26.92, lng: 70.91, icon: "🏜️" },
      { name: "Ajmer", pop: "0.55M", capital: false, lat: 26.45, lng: 74.64, icon: "🕌" },
      { name: "Kota", pop: "1.0M", capital: false, lat: 25.18, lng: 75.85, icon: "🏛️" },
    ]
  },
  "Maharashtra": {
    icon: "🎬", capital: "Mumbai", pop: "112M", area: "307,713 km²", lang: "Marathi",
    region: "West India",
    geo: "Second largest state. The Western Ghats run along the entire coast — a UNESCO Biodiversity Hotspot. The Deccan Plateau rises sharply eastward. Mumbai was originally a cluster of seven islands connected by land reclamation.",
    history: "The Maratha Empire under Chhatrapati Shivaji Maharaj (1674) challenged Mughal dominance and at its peak controlled much of the subcontinent. Pune (Poona) was the Peshwa capital. British established Bombay as their western trading hub in 1661.",
    weather: { summer: "38°C", winter: "16°C", rain: "2500mm (Mumbai)", best: "Nov – Feb" },
    demog: "India's largest economy (~15% of national GDP). Mumbai is the financial capital — home to BSE, NSE, RBI & Bollywood. 83% Hindu. Significant Jain, Buddhist (Ambedkarite), Muslim, and Christian minorities.",
    tags: ["Bollywood", "Financial capital", "Maratha history", "Western Ghats", "Deccan Plateau"],
    cities: [
      { name: "Mumbai", pop: "20.7M", capital: true, lat: 19.07, lng: 72.87, icon: "🏙️" },
      { name: "Pune", pop: "6.6M", capital: false, lat: 18.52, lng: 73.86, icon: "🎓" },
      { name: "Nagpur", pop: "2.5M", capital: false, lat: 21.15, lng: 79.08, icon: "🍊" },
      { name: "Nashik", pop: "1.5M", capital: false, lat: 20.01, lng: 73.79, icon: "🍇" },
      { name: "Aurangabad", pop: "1.2M", capital: false, lat: 19.88, lng: 75.34, icon: "🕌" },
    ]
  },
  "Karnataka": {
    icon: "💻", capital: "Bengaluru", pop: "61.1M", area: "191,791 km²", lang: "Kannada",
    region: "South India",
    geo: "The Western Ghats border the west coast (Malabar). The Deccan Plateau dominates the interior. The Tungabhadra and Krishna rivers shaped medieval civilizations. Kaveri originates in Coorg hills.",
    history: "Seat of the Vijayanagara Empire (1336–1646) — Hampi was one of the world's largest cities. The Hoysala temples (12th–14th c.) are UNESCO World Heritage sites. Mysore Kingdom, ruled by Wadiyars, was the first Indian state to use hydroelectric power (1902).",
    weather: { summer: "35°C", winter: "15°C", rain: "800–3000mm", best: "Oct – Feb" },
    demog: "India's tech capital — Bengaluru employs 2M+ in IT/ITES. Significant in-migration from all over India. Kannada speakers are 66% of the state. Literacy at 75%.",
    tags: ["Silicon Valley of India", "Vijayanagara empire", "Hampi ruins", "Coffee estates", "Western Ghats"],
    cities: [
      { name: "Bengaluru", pop: "12.3M", capital: true, lat: 12.97, lng: 77.59, icon: "💻" },
      { name: "Mysuru", pop: "0.92M", capital: false, lat: 12.30, lng: 76.65, icon: "🏯" },
      { name: "Hubli-Dharwad", pop: "0.94M", capital: false, lat: 15.36, lng: 75.12, icon: "🏭" },
      { name: "Mangaluru", pop: "0.49M", capital: false, lat: 12.87, lng: 74.84, icon: "⛵" },
      { name: "Belagavi", pop: "0.49M", capital: false, lat: 15.85, lng: 74.50, icon: "🏛️" },
    ]
  },
  "Kerala": {
    icon: "🌴", capital: "Thiruvananthapuram", pop: "33.4M", area: "38,852 km²", lang: "Malayalam",
    region: "South India",
    geo: "A narrow strip between Western Ghats and Arabian Sea. 44 rivers, all flowing west. Backwater network: 1,500km of interconnected canals. Munnar tea estates at 1,600m. Periyar is the longest river.",
    history: "Center of global spice trade for 2,000 years. Vasco da Gama landed at Kozhikode in 1498. One of the world's oldest Christian communities (St. Thomas, 52 CE) and Jewish communities (1st century CE). First elected Communist government in the world (1957).",
    weather: { summer: "32°C", winter: "23°C", rain: "3000mm", best: "Nov – Mar" },
    demog: "India's highest literacy rate: 96.2%. Total Fertility Rate 1.8 — near-zero natural growth. Gulf diaspora remittances: ₹85,000 crore/year. Life expectancy 75 years — India's highest. Hindu 55%, Muslim 27%, Christian 18%.",
    tags: ["96% literacy", "Backwaters", "Spice coast", "Kathakali", "Ayurveda"],
    cities: [
      { name: "Thiruvananthapuram", pop: "0.96M", capital: true, lat: 8.52, lng: 76.93, icon: "🏛️" },
      { name: "Kochi", pop: "2.1M", capital: false, lat: 9.93, lng: 76.27, icon: "⛵" },
      { name: "Kozhikode", pop: "0.61M", capital: false, lat: 11.25, lng: 75.78, icon: "🌶️" },
      { name: "Thrissur", pop: "0.32M", capital: false, lat: 10.52, lng: 76.21, icon: "🐘" },
      { name: "Kollam", pop: "0.35M", capital: false, lat: 8.88, lng: 76.59, icon: "🌊" },
    ]
  },
  "Tamil Nadu": {
    icon: "🕌", capital: "Chennai", pop: "72.1M", area: "130,058 km²", lang: "Tamil",
    region: "South India",
    geo: "Peninsular tip of India. Eastern Ghats in the north-west; Nilgiris (2,637m) in the north-west corner. Cauvery (Kaveri) river delta is the rice bowl. Bay of Bengal coastline of 1,076 km.",
    history: "Tamil — the world's oldest living classical language (5th century BCE). The Chola Empire (300 BCE–1279 CE) built the world's largest Hindu temples and had a naval empire reaching Southeast Asia. Mahabalipuram's shore temples date to 7th–8th century CE.",
    weather: { summer: "40°C", winter: "20°C", rain: "900mm", best: "Nov – Mar" },
    demog: "TFR of 1.8 — demographic transition complete. Strong Dravidian political identity — DMK and AIADMK have alternated since 1967. 88% Hindu. Significant Christian community on coast.",
    tags: ["Dravidian culture", "Temple architecture", "Chola empire", "Classical Tamil", "Film industry Kollywood"],
    cities: [
      { name: "Chennai", pop: "10.9M", capital: true, lat: 13.08, lng: 80.27, icon: "🏙️" },
      { name: "Coimbatore", pop: "2.2M", capital: false, lat: 11.01, lng: 76.96, icon: "🏭" },
      { name: "Madurai", pop: "1.5M", capital: false, lat: 9.92, lng: 78.12, icon: "🕌" },
      { name: "Salem", pop: "0.92M", capital: false, lat: 11.67, lng: 78.15, icon: "⚙️" },
      { name: "Tiruchirappalli", pop: "0.92M", capital: false, lat: 10.79, lng: 78.70, icon: "🏯" },
    ]
  },
  "Gujarat": {
    icon: "🦁", capital: "Gandhinagar", pop: "60.4M", area: "196,024 km²", lang: "Gujarati",
    region: "West India",
    geo: "Diverse geography: Rann of Kutch (world's largest salt marsh), Gir Forest (last wild Asiatic lions), Gulf of Khambhat, Saurashtra peninsula, and the tribal Dangs in the southeast. Longest coastline of any Indian state: 1,600km.",
    history: "Harappan Civilisation (2600–1900 BCE) — Lothal was the world's first tidal dock. Birthplace of Mahatma Gandhi (Porbandar). PM Narendra Modi was Chief Minister 2001–2014. Home to the Somnath temple — rebuilt 17 times after repeated invasions.",
    weather: { summer: "45°C", winter: "10°C", rain: "400–1500mm", best: "Oct – Mar" },
    demog: "India's most entrepreneurial state — Gujarati diaspora is the largest Indian community in the USA. 90% Hindu, with significant Jain (6%) and Muslim (10%) communities. Literacy 79%.",
    tags: ["Asiatic lions", "Rann of Kutch", "Gandhi birthplace", "Jain temples", "Textile trade"],
    cities: [
      { name: "Ahmedabad", pop: "8.4M", capital: false, lat: 23.02, lng: 72.57, icon: "🏭" },
      { name: "Surat", pop: "6.5M", capital: false, lat: 21.17, lng: 72.83, icon: "💎" },
      { name: "Vadodara", pop: "2.1M", capital: false, lat: 22.31, lng: 73.18, icon: "🏛️" },
      { name: "Gandhinagar", pop: "0.29M", capital: true, lat: 23.22, lng: 72.65, icon: "🏛️" },
      { name: "Rajkot", pop: "1.5M", capital: false, lat: 22.30, lng: 70.80, icon: "🔧" },
    ]
  },
  "Uttar Pradesh": {
    icon: "🕌", capital: "Lucknow", pop: "199.8M", area: "240,928 km²", lang: "Hindi · Urdu · Awadhi",
    region: "North India",
    geo: "India's most populous state. Entirely in the Indo-Gangetic Plain — flat alluvial land. Ganga, Yamuna, Ghaghra and Gandak river systems. The Terai region borders Nepal. Elevation barely exceeds 300m across the state.",
    history: "The Maurya Empire's Pataliputra was near Allahabad (Prayagraj). The Gupta Empire (4th–6th c.) also centred here. Varanasi is the world's oldest continuously inhabited city. Agra's Taj Mahal and Fatehpur Sikri are Mughal masterpieces. The 1857 uprising centred on Meerut and Lucknow.",
    weather: { summer: "45°C", winter: "3°C", rain: "600–1000mm", best: "Oct – Feb" },
    demog: "Larger in population than Brazil. 80 Lok Sabha seats — the most decisive state in Indian elections. 80% Hindu, 19% Muslim. Literacy 67.7% — one of the lowest for large states. 70% rural population.",
    tags: ["Taj Mahal", "Varanasi ghats", "Kumbh Mela", "Mughal heritage", "Political heartland"],
    cities: [
      { name: "Lucknow", pop: "3.7M", capital: true, lat: 26.85, lng: 80.94, icon: "🕌" },
      { name: "Kanpur", pop: "3.1M", capital: false, lat: 26.46, lng: 80.33, icon: "🏭" },
      { name: "Agra", pop: "1.8M", capital: false, lat: 27.18, lng: 78.01, icon: "🏛️" },
      { name: "Varanasi", pop: "1.4M", capital: false, lat: 25.32, lng: 83.00, icon: "🕉️" },
      { name: "Prayagraj", pop: "1.5M", capital: false, lat: 25.44, lng: 81.84, icon: "🌊" },
      { name: "Noida", pop: "0.64M", capital: false, lat: 28.54, lng: 77.39, icon: "💻" },
    ]
  },
  "West Bengal": {
    icon: "🎨", capital: "Kolkata", pop: "91.3M", area: "88,752 km²", lang: "Bengali",
    region: "East India",
    geo: "Diverse terrain: Darjeeling Himalayas in the north, the Gangetic plains in the centre, and the Sundarbans mangrove delta in the south — the world's largest. The Hooghly river (distributary of Ganga) defines Kolkata's geography.",
    history: "Calcutta was the British colonial capital until 1911 — the intellectual and commercial centre of the Empire. The Bengal Renaissance (19th c.) produced Tagore, Vivekananda, Bose, Roy. The Great Bengal Famine (1943) killed 2–3 million under Churchill's watch.",
    weather: { summer: "40°C", winter: "12°C", rain: "1600mm", best: "Oct – Mar" },
    demog: "Third most populous state. 70% Hindu, 27% Muslim — the largest Muslim proportion of any large state. Home to significant numbers of Bihari, Marwari, Chinese, Anglo-Indian communities. Literacy 76.3%.",
    tags: ["Sundarbans", "Bengal Renaissance", "Durga Puja", "Rabindranath Tagore", "Kolkata trams"],
    cities: [
      { name: "Kolkata", pop: "14.9M", capital: true, lat: 22.57, lng: 88.36, icon: "🎨" },
      { name: "Asansol", pop: "1.3M", capital: false, lat: 23.69, lng: 86.96, icon: "⛏️" },
      { name: "Siliguri", pop: "0.73M", capital: false, lat: 26.71, lng: 88.43, icon: "🍵" },
      { name: "Durgapur", pop: "0.60M", capital: false, lat: 23.48, lng: 87.32, icon: "🏭" },
    ]
  },
  "Madhya Pradesh": {
    icon: "🐯", capital: "Bhopal", pop: "72.6M", area: "308,252 km²", lang: "Hindi",
    region: "Central India",
    geo: "India's second largest state (geographically). The Vindhya and Satpura ranges cross the state. Narmada river flows west through a rift valley. MP has the highest forest cover (25% of land area). Kanha, Pench, Bandhavgarh — iconic Project Tiger reserves.",
    history: "Sanchi Stupa (3rd c. BCE, Emperor Ashoka) is one of the world's oldest stone structures. The Chandela dynasty built Khajuraho temples (950–1050 CE) — UNESCO World Heritage. Gwalior Fort is considered 'the pearl among fortresses in India' by Babur.",
    weather: { summer: "48°C", winter: "5°C", rain: "900–1400mm", best: "Oct – Feb" },
    demog: "21% Scheduled Tribe population — India's second largest. Predominantly rural (72%). Literacy 69.3%. BJP stronghold since 2003 except for brief Congress interval (2018–2020).",
    tags: ["Tiger reserves", "Khajuraho temples", "Sanchi Stupa", "Narmada river", "Tribal culture"],
    cities: [
      { name: "Bhopal", pop: "1.9M", capital: true, lat: 23.26, lng: 77.41, icon: "🏙️" },
      { name: "Indore", pop: "3.3M", capital: false, lat: 22.72, lng: 75.86, icon: "🏭" },
      { name: "Gwalior", pop: "1.1M", capital: false, lat: 26.22, lng: 78.18, icon: "🏯" },
      { name: "Jabalpur", pop: "1.2M", capital: false, lat: 23.18, lng: 79.94, icon: "🌿" },
      { name: "Ujjain", pop: "0.52M", capital: false, lat: 23.18, lng: 75.78, icon: "🕉️" },
    ]
  },
  "Punjab": {
    icon: "🌾", capital: "Chandigarh", pop: "27.7M", area: "50,362 km²", lang: "Punjabi",
    region: "North India",
    geo: "The 'Land of Five Rivers' — Sutlej, Beas, Ravi, Chenab, Jhelum (most now in Pakistan). Entirely flat alluvial plain. India's bread basket — irrigated by one of the world's most extensive canal systems built under British colonial rule.",
    history: "Birthplace of Sikhism — Guru Nanak (1469) was born in Nankana Sahib (now Pakistan). The Golden Temple (Harmandir Sahib) in Amritsar is Sikhism's holiest shrine. The Partition of 1947 cut Punjab in two — one of history's largest and bloodiest migrations.",
    weather: { summer: "44°C", winter: "2°C", rain: "500–700mm", best: "Oct – Mar" },
    demog: "Sikhs are ~58% of the population — unique in India. Green Revolution (1960s) transformed Punjab into India's most prosperous agricultural state. Significant NRI Punjabi diaspora in Canada, UK, USA. Literacy 75.8%.",
    tags: ["Golden Temple", "Sikh culture", "Green Revolution", "Bhangra", "Wagah border"],
    cities: [
      { name: "Chandigarh", pop: "1.0M", capital: true, lat: 30.73, lng: 76.78, icon: "🌳" },
      { name: "Ludhiana", pop: "1.7M", capital: false, lat: 30.90, lng: 75.86, icon: "🏭" },
      { name: "Amritsar", pop: "1.2M", capital: false, lat: 31.63, lng: 74.87, icon: "🙏" },
      { name: "Jalandhar", pop: "0.87M", capital: false, lat: 31.33, lng: 75.58, icon: "⚽" },
    ]
  },
  "Assam": {
    icon: "🍵", capital: "Dispur", pop: "31.2M", area: "78,438 km²", lang: "Assamese",
    region: "Northeast India",
    geo: "The Brahmaputra river valley dominates — one of the world's largest river systems. The Brahmaputra deposits silt islands (chars) that appear and disappear with floods. Kaziranga National Park — UNESCO site — has 2/3 of world's one-horned rhinoceroses.",
    history: "The Ahom Kingdom ruled Assam for 600 years (1228–1826) — the longest-lasting medieval dynasty in South Asia — defeating even Mughal armies. British annexed in 1826 after the First Anglo-Burmese War. The tea industry was established by the British in the 1840s.",
    weather: { summer: "35°C", winter: "8°C", rain: "1700mm", best: "Oct – Apr" },
    demog: "82% Hindu, 34% Muslim. Contested demographics due to alleged illegal immigration from Bangladesh — a major political flashpoint. Major tea-growing communities include Adivasi (tribal) workers brought by the British. Literacy 73%.",
    tags: ["One-horned rhino", "Tea gardens", "Ahom kingdom", "Brahmaputra", "Bihu festival"],
    cities: [
      { name: "Guwahati", pop: "1.0M", capital: false, lat: 26.14, lng: 91.74, icon: "🏙️" },
      { name: "Dispur", pop: "0.1M", capital: true, lat: 26.14, lng: 91.78, icon: "🏛️" },
      { name: "Silchar", pop: "0.19M", capital: false, lat: 24.82, lng: 92.79, icon: "🍵" },
      { name: "Dibrugarh", pop: "0.15M", capital: false, lat: 27.47, lng: 95.00, icon: "🌿" },
    ]
  },
  "Telangana": {
    icon: "💎", capital: "Hyderabad", pop: "35M", area: "112,077 km²", lang: "Telugu",
    region: "South India",
    geo: "Deccan Plateau state with rolling terrain. The Krishna and Godavari rivers cross the state. Average elevation 500m. Nagarjunasagar Dam — one of the world's largest masonry dams. The state was carved out of Andhra Pradesh in 2014.",
    history: "Hyderabad was the world's 6th largest city in 1900, ruled by the Nizams — India's wealthiest rulers. The Charminar (1591) and Golconda Fort define its skyline. The Telangana agitation (1969–2014) was India's longest statehood movement.",
    weather: { summer: "42°C", winter: "14°C", rain: "900mm", best: "Oct – Mar" },
    demog: "Hyderabad is India's fourth-largest city and a major IT hub (HITEC City). 85% Hindu, 13% Muslim. Telugu is the official language. Significant reverse migration of Telugu diaspora from the USA.",
    tags: ["City of Pearls", "Nizami culture", "HITEC City", "Golconda Fort", "Biryani capital"],
    cities: [
      { name: "Hyderabad", pop: "9.7M", capital: true, lat: 17.38, lng: 78.48, icon: "💎" },
      { name: "Warangal", pop: "0.81M", capital: false, lat: 17.97, lng: 79.59, icon: "🏯" },
      { name: "Nizamabad", pop: "0.31M", capital: false, lat: 18.67, lng: 78.09, icon: "🌾" },
      { name: "Khammam", pop: "0.26M", capital: false, lat: 17.25, lng: 80.15, icon: "🌿" },
    ]
  },
  "Andhra Pradesh": {
    icon: "🏛️", capital: "Amaravati", pop: "49.4M", area: "162,975 km²", lang: "Telugu",
    region: "South India",
    geo: "Eastern Ghats run parallel to the coast. The Godavari and Krishna deltas are the 'rice bowls of India'. 974km coastline along Bay of Bengal. Araku Valley in the north is a highland coffee-growing region.",
    history: "Ancient Satavahana dynasty (3rd c. BCE–3rd c. CE) was centred here. The Amaravati stupa (3rd c. BCE) is one of India's oldest Buddhist sites. The state was bifurcated in 2014 — Telangana was carved out, and AP has since struggled to build a new capital at Amaravati.",
    weather: { summer: "42°C", winter: "17°C", rain: "900mm", best: "Nov – Feb" },
    demog: "Population dominated by Kamma, Reddy, Kapu communities — all politically powerful. 91% Hindu. Telugu cinema (Tollywood) is the second largest in India by output. Literacy 67%.",
    tags: ["Krishna-Godavari delta", "Amaravati stupa", "Tirupati Balaji", "Telugu culture", "Spicy Andhra cuisine"],
    cities: [
      { name: "Visakhapatnam", pop: "2.0M", capital: false, lat: 17.69, lng: 83.22, icon: "⚓" },
      { name: "Vijayawada", pop: "1.5M", capital: false, lat: 16.51, lng: 80.62, icon: "🌊" },
      { name: "Amaravati", pop: "0.05M", capital: true, lat: 16.51, lng: 80.35, icon: "🏛️" },
      { name: "Guntur", pop: "0.74M", capital: false, lat: 16.31, lng: 80.44, icon: "🌶️" },
      { name: "Tirupati", pop: "0.45M", capital: false, lat: 13.65, lng: 79.42, icon: "🕉️" },
    ]
  },
  "Bihar": {
    icon: "🕉️", capital: "Patna", pop: "104M", area: "94,163 km²", lang: "Hindi · Maithili · Bhojpuri",
    region: "East India",
    geo: "Entirely in the Gangetic Plain. The Ganga divides it — north has the Himalayan-fed rivers (Gandak, Kosi, Bagmati) prone to flooding. South Bihar has older Peninsular terrain. No coastline. Borders Nepal to the north.",
    history: "The Maurya Empire (322–185 BCE) under Chandragupta and Ashoka was centred in Pataliputra (modern Patna). Nalanda University (5th–12th c.) was the world's first residential university. Buddha attained enlightenment at Bodh Gaya. The Gupta Empire (4th–6th c.) — India's Golden Age — also originated here.",
    weather: { summer: "44°C", winter: "5°C", rain: "1000mm", best: "Oct – Mar" },
    demog: "India's most densely populated large state (~1,220 people/km²). Fertility rate 3.0 — the highest in India. Strong caste arithmetic drives politics (RJD's Yadav base, Nitish Kumar's Kurmi base). 82% Hindu, 17% Muslim. Literacy 61.8% — second lowest.",
    tags: ["Bodh Gaya", "Nalanda University", "Maurya empire", "Chhath Puja", "Litchi orchards"],
    cities: [
      { name: "Patna", pop: "2.5M", capital: true, lat: 25.59, lng: 85.14, icon: "🕉️" },
      { name: "Gaya", pop: "0.47M", capital: false, lat: 24.79, lng: 85.00, icon: "🙏" },
      { name: "Muzaffarpur", pop: "0.42M", capital: false, lat: 26.12, lng: 85.39, icon: "🍈" },
      { name: "Bhagalpur", pop: "0.41M", capital: false, lat: 25.24, lng: 87.01, icon: "🌊" },
    ]
  },
  "Odisha": {
    icon: "🏯", capital: "Bhubaneswar", pop: "41.97M", area: "155,707 km²", lang: "Odia",
    region: "East India",
    geo: "Eastern Ghats fringe the west and north. Chilika Lake — Asia's largest coastal lagoon — hosts migratory flamingos and Irrawaddy dolphins. The Mahanadi river and its delta dominate the coastal plain. Bay of Bengal coastline is prone to cyclones.",
    history: "The Kalinga War (261 BCE) where Ashoka defeated the Kalinga kingdom but was so horrified by the carnage that he converted to Buddhism. The Konark Sun Temple (13th c.) and Jagannath Temple, Puri are UNESCO-listed masterpieces.",
    weather: { summer: "42°C", winter: "15°C", rain: "1500mm", best: "Oct – Mar" },
    demog: "22% Scheduled Tribe population. Literacy 72.9%. Significant Odia diaspora in neighbouring states. The Rath Yatra (Puri Jagannath chariot festival) draws millions of pilgrims. 93% Hindu.",
    tags: ["Konark Sun Temple", "Puri Jagannath", "Chilika Lake", "Tribal art", "Odissi dance"],
    cities: [
      { name: "Bhubaneswar", pop: "1.0M", capital: true, lat: 20.29, lng: 85.82, icon: "🏛️" },
      { name: "Cuttack", pop: "0.67M", capital: false, lat: 20.46, lng: 85.88, icon: "⚔️" },
      { name: "Rourkela", pop: "0.55M", capital: false, lat: 22.22, lng: 84.86, icon: "⚙️" },
      { name: "Puri", pop: "0.20M", capital: false, lat: 19.81, lng: 85.83, icon: "🙏" },
    ]
  },
  "Delhi": {
    icon: "🏙️", capital: "New Delhi", pop: "16.8M", area: "1,484 km²", lang: "Hindi · Punjabi · Urdu",
    region: "National Capital Territory",
    geo: "Located on the Yamuna river in the upper Gangetic plain. Unique dual governance: elected state government + Lieutenant Governor (representing Centre). Contains 8 historical cities within its current boundaries — from Lal Kot (11th c.) to Lutyens' New Delhi (1911).",
    history: "Delhi has been the capital of empires for over 1,000 years. The Delhi Sultanate (1206–1526) and Mughal Empire (1526–1857) were both centred here. Qutub Minar (1193), India Gate, Red Fort, and Humayun's Tomb define its skyline. The 1947 Partition brought massive refugee migrations.",
    weather: { summer: "45°C", winter: "2°C", rain: "617mm", best: "Oct – Mar" },
    demog: "Most cosmopolitan city in India — people from every state. Significant Punjabi Partition refugee community. AAP (Aam Aadmi Party) has governed since 2015 with landslide majorities, pioneering free electricity and water models.",
    tags: ["Red Fort", "Qutub Minar", "Chandni Chowk", "India Gate", "Political capital"],
    cities: [
      { name: "New Delhi", pop: "0.25M", capital: true, lat: 28.61, lng: 77.21, icon: "🏛️" },
      { name: "Delhi (city)", pop: "16.5M", capital: false, lat: 28.65, lng: 77.23, icon: "🏙️" },
      { name: "Noida", pop: "0.64M", capital: false, lat: 28.54, lng: 77.39, icon: "💻" },
      { name: "Gurgaon", pop: "1.5M", capital: false, lat: 28.46, lng: 77.03, icon: "🏢" },
    ]
  },
  "Goa": {
    icon: "🌊", capital: "Panaji", pop: "1.46M", area: "3,702 km²", lang: "Konkani · Marathi",
    region: "West India",
    geo: "India's smallest state by area. 101km of Arabian Sea coastline. Western Ghats in the east, narrow coastal strip in the west. Mandovi and Zuari rivers divide the state into North and South Goa. Dudhsagar Falls — one of India's tallest waterfalls.",
    history: "Portuguese colonial enclave from 1510 until India's military annexation in 1961 — 451 years of Portuguese rule. The Inquisition of Goa (1560–1812) was one of the most feared in the world. This heritage gives Goa its unique Latin-Catholic architecture, cuisine, and culture.",
    weather: { summer: "33°C", winter: "21°C", rain: "2900mm", best: "Nov – Feb" },
    demog: "India's highest per-capita income among small states. 65% Hindu, 26% Catholic. Tourism is the primary industry. Significant Konkani, Goan Catholic, and Goan Hindu cultural identities co-exist. India's most popular international tourist destination.",
    tags: ["Beach capital", "Portuguese heritage", "Carnival", "Seafood cuisine", "Konkani culture"],
    cities: [
      { name: "Panaji", pop: "0.11M", capital: true, lat: 15.49, lng: 73.82, icon: "⚜️" },
      { name: "Margao", pop: "0.10M", capital: false, lat: 15.27, lng: 73.96, icon: "🌊" },
      { name: "Vasco da Gama", pop: "0.10M", capital: false, lat: 15.40, lng: 73.81, icon: "⛵" },
    ]
  },
};

export function getStateName(properties) {
  return properties.NAME_1 || properties.name || properties.st_nm || properties.NAME || properties.state || "";
}
