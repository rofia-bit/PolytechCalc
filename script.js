

function validateInput(input) {
            const value = parseFloat(input.value);
            
            if (value > 20) {
                input.classList.add('invalid');
                input.value = '20'; 
                return false;
            } else {
                input.classList.remove('invalid');
                return true;
            }
        }


        
        // to calculate grade for modules without TP
        function calculateWithoutTP(test, exam) {
            if (test === '' || exam === '') return null;
            const result = (test * 0.4) + (exam * 0.6);
            return Math.min(result, 20);
        }
        
        // to calculate grade for modules with TP
        function calculateWithTP(test, tp, exam) {
            if (test === '' || tp === '' || exam === '') return null;
            const result = (test * 0.2) + (tp * 0.3) + (exam * 0.5);
            return Math.min(result, 20);
        }
        
        function formatNumber(num) {
            return num !== null ? num.toFixed(2) : '-';
        }


                const STORAGE_KEY = 'polytechcalc-inputs';

                function isLocalStorageAvailable() {
                    try {
                        const testKey = '__ls_test__';
                        localStorage.setItem(testKey, testKey);
                        localStorage.removeItem(testKey);
                        return true;
                    } catch (e) {
                        return false;
                    }
                }

                function saveInputsToStorage() {
                    if (!isLocalStorageAvailable()) return;
                    const payload = {};
                    document.querySelectorAll('input[type="number"]').forEach(input => {
                        if (input.id) payload[input.id] = input.value;
                    });
                    try {
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
                    } catch (e) {
                        
                    }
                }

                function restoreInputsFromStorage() {
                    if (!isLocalStorageAvailable()) return;
                    const raw = localStorage.getItem(STORAGE_KEY);
                    if (!raw) return;
                    try {
                        const data = JSON.parse(raw);
                        Object.keys(data).forEach(id => {
                            const el = document.getElementById(id);
                            if (el) el.value = data[id];
                        });
                    } catch (e) {
                    
                    }
                }

                function clearStoredInputs() {
                    if (!isLocalStorageAvailable()) return;
                    localStorage.removeItem(STORAGE_KEY);
                }
        
        
        function calculateAllGrades() {
            const allInputs = document.querySelectorAll('input[type="number"]');
            allInputs.forEach(validateInput);
            
            
            const modules = {
                
                analysis: {
                    test: parseFloat(document.getElementById('analysis-test').value) || 0,
                    exam: parseFloat(document.getElementById('analysis-exam').value) || 0,
                    credits: 4,
                    result: null
                },
                rm: {
                    test: parseFloat(document.getElementById('rm-test').value) || 0,
                    exam: parseFloat(document.getElementById('rm-exam').value) || 0,
                    credits: 3,
                    result: null
                },
                english: {
                    test: parseFloat(document.getElementById('english-test').value) || 0,
                    exam: parseFloat(document.getElementById('english-exam').value) || 0,
                    credits: 1,
                    result: null
                },
                french: {
                    test: parseFloat(document.getElementById('french-test').value) || 0,
                    exam: parseFloat(document.getElementById('french-exam').value) || 0,
                    credits: 1,
                    result: null
                },
                
                // with TP modules
                numAna: {
                    test: parseFloat(document.getElementById('num-ana-test').value) || 0,
                    tp: parseFloat(document.getElementById('num-ana-tp').value) || 0,
                    exam: parseFloat(document.getElementById('num-ana-exam').value) || 0,
                    credits: 3,
                    result: null
                },
                physics: {
                    test: parseFloat(document.getElementById('physics-test').value) || 0,
                    tp: parseFloat(document.getElementById('physics-tp').value) || 0,
                    exam: parseFloat(document.getElementById('physics-exam').value) || 0,
                    credits: 4,
                    result: null
                },
                chemistry: {
                    test: parseFloat(document.getElementById('chemistry-test').value) || 0,
                    tp: parseFloat(document.getElementById('chemistry-tp').value) || 0,
                    exam: parseFloat(document.getElementById('chemistry-exam').value) || 0,
                    credits: 3,
                    result: null
                },
                electricity: {
                    test: parseFloat(document.getElementById('electricity-test').value) || 0,
                    tp: parseFloat(document.getElementById('electricity-tp').value) || 0,
                    exam: parseFloat(document.getElementById('electricity-exam').value) || 0,
                    credits: 3,
                    result: null
                },
                fm: {
                    test: parseFloat(document.getElementById('fm-test').value) || 0,
                    tp: parseFloat(document.getElementById('fm-tp').value) || 0,
                    exam: parseFloat(document.getElementById('fm-exam').value) || 0,
                    credits: 3,
                    result: null
                },
                cs: {
                    test: parseFloat(document.getElementById('cs-test').value) || 0,
                    tp: parseFloat(document.getElementById('cs-tp').value) || 0,
                    exam: parseFloat(document.getElementById('cs-exam').value) || 0,
                    credits: 3,
                    result: null
                },
                engineering: {
                    test: parseFloat(document.getElementById('engineering-test').value) || 0,
                    tp: parseFloat(document.getElementById('engineering-tp').value) || 0,
                    exam: parseFloat(document.getElementById('engineering-exam').value) || 0,
                    credits: 3,
                    result: null
                }
            };
            
            // calculate results for each module

            // modules without TP
            modules.analysis.result = calculateWithoutTP(modules.analysis.test, modules.analysis.exam);
            modules.rm.result = calculateWithoutTP(modules.rm.test, modules.rm.exam);
            modules.english.result = calculateWithoutTP(modules.english.test, modules.english.exam);
            modules.french.result = calculateWithoutTP(modules.french.test, modules.french.exam);
            
            // modules with TP
            modules.numAna.result = calculateWithTP(modules.numAna.test, modules.numAna.tp, modules.numAna.exam);
            modules.physics.result = calculateWithTP(modules.physics.test, modules.physics.tp, modules.physics.exam);
            modules.chemistry.result = calculateWithTP(modules.chemistry.test, modules.chemistry.tp, modules.chemistry.exam);
            modules.electricity.result = calculateWithTP(modules.electricity.test, modules.electricity.tp, modules.electricity.exam);
            modules.fm.result = calculateWithTP(modules.fm.test, modules.fm.tp, modules.fm.exam);
            modules.cs.result = calculateWithTP(modules.cs.test, modules.cs.tp, modules.cs.exam);
            modules.engineering.result = calculateWithTP(modules.engineering.test, modules.engineering.tp, modules.engineering.exam);
            
            document.getElementById('analysis-result').textContent = formatNumber(modules.analysis.result);
            document.getElementById('rm-result').textContent = formatNumber(modules.rm.result);
            document.getElementById('english-result').textContent = formatNumber(modules.english.result);
            document.getElementById('french-result').textContent = formatNumber(modules.french.result);
            document.getElementById('num-ana-result').textContent = formatNumber(modules.numAna.result);
            document.getElementById('physics-result').textContent = formatNumber(modules.physics.result);
            document.getElementById('chemistry-result').textContent = formatNumber(modules.chemistry.result);
            document.getElementById('electricity-result').textContent = formatNumber(modules.electricity.result);
            document.getElementById('fm-result').textContent = formatNumber(modules.fm.result);
            document.getElementById('cs-result').textContent = formatNumber(modules.cs.result);
            document.getElementById('engineering-result').textContent = formatNumber(modules.engineering.result);
            
            document.getElementById('final-analysis').textContent = formatNumber(modules.analysis.result);
            document.getElementById('final-rm').textContent = formatNumber(modules.rm.result);
            document.getElementById('final-english').textContent = formatNumber(modules.english.result);
            document.getElementById('final-french').textContent = formatNumber(modules.french.result);
            document.getElementById('final-num-ana').textContent = formatNumber(modules.numAna.result);
            document.getElementById('final-physics').textContent = formatNumber(modules.physics.result);
            document.getElementById('final-chemistry').textContent = formatNumber(modules.chemistry.result);
            document.getElementById('final-electricity').textContent = formatNumber(modules.electricity.result);
            document.getElementById('final-fm').textContent = formatNumber(modules.fm.result);
            document.getElementById('final-cs').textContent = formatNumber(modules.cs.result);
            document.getElementById('final-engineering').textContent = formatNumber(modules.engineering.result);
            
            let totalCredits = 0;
            let weightedSum = 0;
            
            for (const module in modules) {
                if (modules[module].result !== null) {
                    weightedSum += modules[module].result * modules[module].credits;
                    totalCredits += modules[module].credits;
                }
            }
            
            const overallAverage = totalCredits > 0 ? weightedSum / totalCredits : null;
            document.getElementById('overall-average').textContent = formatNumber(overallAverage);
            
            return modules;
        }
        
        function resetAllFields() {

            const allInputs = document.querySelectorAll('input[type="number"]');
            
            allInputs.forEach(input => {
                input.value = '';
                input.classList.remove('invalid');
            });
            

            const allResults = document.querySelectorAll('.module-result, .result-value, .overall-score');
            allResults.forEach(result => {
                result.textContent = '-';
            });
        }
        
        const allInputs = document.querySelectorAll('input[type="number"]');
        allInputs.forEach(input => {
            input.addEventListener('input', function() {
                validateInput(this);
                calculateAllGrades();
            });


            
            input.addEventListener('blur', function() {
                validateInput(this);
            });

        });
        
        document.getElementById('calculate-btn').addEventListener('click', calculateAllGrades);
        document.getElementById('reset-btn').addEventListener('click', resetAllFields);
        

        document.addEventListener('DOMContentLoaded', calculateAllGrades);

        


        (function() {
            let saveTimeout = null;
            document.addEventListener('input', function(e) {
                const el = e.target;
                if (!el) return;
                if (el.tagName === 'INPUT' && el.type === 'number') {
                    clearTimeout(saveTimeout);
                    saveTimeout = setTimeout(() => saveInputsToStorage(), 250);
                }
            });


            const calcBtn = document.getElementById('calculate-btn');
            if (calcBtn) {
                calcBtn.addEventListener('click', function() {

                    setTimeout(saveInputsToStorage, 50);
                });
            }

            const resetBtn = document.getElementById('reset-btn');
            if (resetBtn) {
                resetBtn.addEventListener('click', function() {
                    clearStoredInputs();
                });
            }

            document.addEventListener('DOMContentLoaded', function() {
                restoreInputsFromStorage();
                calculateAllGrades();
            });
        })();

        (function() {
            const THEME_KEY = 'polytechcalc-theme';
            const themeToggle = document.getElementById('theme-toggle');
            const themeBubble = document.getElementById('theme-bubble');
            const backToTop = document.getElementById('back-to-top');

            function applyTheme(theme) {
                if (theme === 'light') {
                    document.body.classList.add('light-theme');
                    if (themeToggle) {
                        themeToggle.textContent = 'light';
                        themeToggle.setAttribute('aria-pressed', 'true');
                    }
                    if (themeBubble) {
                        themeBubble.textContent = 'light';
                        themeBubble.setAttribute('aria-pressed', 'true');
                    }
                } else {
                    document.body.classList.remove('light-theme');
                    if (themeToggle) {
                        themeToggle.textContent = 'dark';
                        themeToggle.setAttribute('aria-pressed', 'false');
                    }
                    if (themeBubble) {
                        themeBubble.textContent = 'dark';
                        themeBubble.setAttribute('aria-pressed', 'false');
                    }
                }
            }

            function saveTheme(theme) {
                try {
                    localStorage.setItem(THEME_KEY, theme);
                } catch (e) {}
            }

            function restoreTheme() {
                try {
                    const t = localStorage.getItem(THEME_KEY);
                    if (t) applyTheme(t);
                } catch (e) {}
            }

            if (themeToggle) {
                themeToggle.addEventListener('click', function() {
                    const isLight = document.body.classList.contains('light-theme');
                    const next = isLight ? 'dark' : 'light';
                    applyTheme(next);
                    saveTheme(next);
                });
            }
            if (themeBubble) {
                themeBubble.addEventListener('click', function() {
                    const isLight = document.body.classList.contains('light-theme');
                    const next = isLight ? 'dark' : 'light';
                    applyTheme(next);
                    saveTheme(next);
                });
            }

            // back-to-top behaviour
            function updateBackToTop() {
                if (!backToTop && !themeBubble) return;
                if (window.scrollY > 320) {
                    if (backToTop) backToTop.classList.add('show');
                    if (themeBubble) themeBubble.classList.add('show');
                } else {
                    if (backToTop) backToTop.classList.remove('show');
                    if (themeBubble) themeBubble.classList.remove('show');
                }
            }

            if (backToTop) {
                backToTop.addEventListener('click', function() {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
                window.addEventListener('scroll', updateBackToTop);
                updateBackToTop();
            }


            
            document.addEventListener('DOMContentLoaded', restoreTheme);
        })();
    