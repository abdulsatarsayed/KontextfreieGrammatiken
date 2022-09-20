# KontextfreieGrammatiken
Programmiersprachen erkenner und Syntax Prüfer
Es geht um Implementierung verschiedener Verfahren aus der Theorie der Automaten und formalen Sprachen, insbesondere bezogen auf kontextfreie Sprachen.
Kontextfreie Sprachen werden eingesetzt, um die Syntax von Programmier- oder Beschreibungssprachen zu definieren. Dafur sind kontextfreie Sprachen
im Allgemeinen ausreichend, wohingegen reguläre Sprachen Eng(Regular Expressions), mit denen keine Klammerstrukturen dargestellt werden können, normalerweise
nicht ausdrucksmächtig genug sind. Kontextfreie Sprachen kann man durch sogenannte kontextfreie Grammatiken, bei denen sich auf der linken Seite jeder Regel genau ein
Nicht-Terminal befindet – oder alternativ durch Kellerautomaten spezifizieren. Kellerautomaten verallgemeinern endliche Automaten durch einen StackSpeicher,
auf dem zusätzliche Informationen gemerkt werden können. Es gibt sowohl deterministische als auch nicht-deterministische Kellerautomaten, wobei
die nicht-deterministischen Automaten echt mächtiger sind als die deterministischen.
Mein Ziel war insbesonderes die Implementierung und Simulation der Kellerautomaten und dazu gehörige kontextfreie Grammatiken. Die Arbeit war erfolgreich abgeschlossen,
Verbesserungsvorschläge sind immer noch vorhanden. In der Zukünft plane ich das CYK Algorithmus mit der Komplexitätszeit O(n^2) zu implementieren.
Looking forwards..

