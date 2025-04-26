import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

# Cargar datos
df = pd.read_csv("datos_estudiantes_6000.csv")

# Arreglar caracteres extraños (– a - en distancia)
df['Distancia entre el hogar y la escuela'] = df['Distancia entre el hogar y la escuela'].str.replace('–', '-', regex=False)

# Revisión rápida (opcional)
print("Columnas categóricas:", df.select_dtypes(include='object').columns.tolist())

# Codificación
label_encoders = {}
for col in df.columns:
    if df[col].dtype == 'object':
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        label_encoders[col] = le

# Separar variables
X = df.drop(columns=['Rendimiento académico'])
y = df['Rendimiento académico']

# Separar en entrenamiento/prueba
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Modelo de ejemplo
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluación
y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))
