import numpy as np
import pandas as pd
from numpy.random import choice as random_choice

# Generamos 6000 datos sintéticos basados en la estructura dada
n = 6000  # número de registros

# Redefinimos los generadores con las nuevas etiquetas proporcionadas
edad = random_choice(['adolescencia temprana', 'adolescencia media', 'adolescencia tardía', 'otros'], size=n)
genero = random_choice(['masculino', 'femenino'], size=n)
obesidad = random_choice(['sí', 'no'], size=n)
ingresos = random_choice(['clase baja', 'clase media-baja', 'clase media-alta', 'alta'], size=n)
tam_familia = random_choice(['pequeño', 'mediano', 'grande'], size=n)
edu_padre = random_choice(['sin educación', 'primaria', 'secundaria', 'preparatoria', 'licenciatura', 'posgrado'], size=n)
edu_madre = random_choice(['sin educación', 'primaria', 'secundaria', 'preparatoria', 'licenciatura', 'posgrado'], size=n)
estado_civil = random_choice(['soltero', 'casado', 'separado', 'divorciado', 'viudo'], size=n)
horas_estudio = np.clip(np.random.normal(2.5, 1.2, n), 0, 10).round(1)
estado_residencial = random_choice(['con padres', 'con familiares', 'albergue'], size=n)
tipo_familia = random_choice(['conjunto', 'nuclear'], size=n)
num_niños_casa = np.random.randint(1, 7, n)

edu_genero = random_choice(['unisexo', 'mixto'], size=n)
cat_escuela = random_choice(['público', 'privado'], size=n)
dias_ausencia = np.random.poisson(3, n)
distancia = random_choice(['menos de 1 km', '1–3 km', '3–5 km', 'más de 5 km'], size=n)
dias_retraso = random_choice(['nunca', 'una vez a la semana', 'dos veces a la semana', 'casi todos los días'], size=n)
transporte = random_choice(['transporte público', 'transporte privado', 'a pie'], size=n)
rend_prev = random_choice(['bajo', 'moderado', 'alto'], size=n)

estres = random_choice(['mayor', 'grave', 'moderado', 'leve', 'muy poco estrés'], size=n)
act_fisica = random_choice(['regular', 'ocasional', 'nunca'], size=n)
alimentacion = random_choice(['regular', 'ocasional', 'nunca'], size=n)
tabaco = random_choice(['regular', 'ocasional', 'nunca'], size=n)
alcohol = random_choice(['regular', 'ocasional', 'nunca'], size=n)
comportamiento = random_choice(['casi siempre', 'bastante a menudo', 'algunas veces', 'rara vez', 'casi nunca'], size=n)
optimismo = random_choice(['casi nunca', 'rara vez', 'a veces', 'bastante a menudo', 'casi siempre'], size=n)
tension = random_choice(['casi siempre', 'bastante a menudo', 'algunas veces', 'rara vez', 'casi nunca'], size=n)
tristeza = random_choice(['casi siempre', 'bastante a menudo', 'algunas veces', 'rara vez', 'casi nunca'], size=n)

# Resultado con regla de ejemplo basada en rendimiento previo, horas de estudio y estrés
def generar_rendimiento(estudio, prev, estres):
    if estudio >= 4.5 and prev == 'alto' and estres in ['leve', 'muy poco estrés']:
        return 'alto'
    elif estudio >= 2.5 and prev in ['moderado', 'alto']:
        return 'moderado'
    else:
        return 'bajo'

rendimiento = [generar_rendimiento(h, p, e) for h, p, e in zip(horas_estudio, rend_prev, estres)]

# Crear el DataFrame
df_6000 = pd.DataFrame({
    'Edad': edad,
    'Género': genero,
    'Obesidad': obesidad,
    'Ingresos familiares promedio': ingresos,
    'Tamaño de la familia': tam_familia,
    'Título educativo del padre': edu_padre,
    'Título educativo de la madre': edu_madre,
    'Estado civil de los padres': estado_civil,
    'Horas de estudio': horas_estudio,
    'Estado residencial': estado_residencial,
    'Tipo de familia': tipo_familia,
    'Número de niños que viven juntos en casa': num_niños_casa,
    'Educación de género': edu_genero,
    'Categoría de escuelas': cat_escuela,
    'Número promedio de días de ausencia': dias_ausencia,
    'Distancia entre el hogar y la escuela': distancia,
    'Número promedio de días de retraso': dias_retraso,
    'Modo de desplazamiento a la escuela': transporte,
    'Rendimiento académico previo': rend_prev,
    'Estrés': estres,
    'Actividad física': act_fisica,
    'Ingesta de alimentos': alimentacion,
    'Consumo de tabaco': tabaco,
    'Consumo de alcohol por semana': alcohol,
    'Tipo de comportamiento': comportamiento,
    'Pensamiento positivo u optimista': optimismo,
    'Sentirse tenso o incómodo': tension,
    'Sentirse triste o deprimido': tristeza,
    'Rendimiento académico': rendimiento
})

df_6000.to_csv("datos_estudiantes_6000.csv", index=False, encoding='utf-8-sig') 
print(df_6000.head())
