import psycopg2
from psycopg2.extras import RealDictCursor

# ============================================
# CONFIGURACIÓN DIRECTA (pon tu cadena de Neon)
# ============================================

DATABASE_URL = ""

# ============================
#   CONEXIÓN A LA BD
# ============================
try:
    conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
    cursor = conn.cursor()
    print("✅ Conexión exitosa a Neon\n")

except Exception as e:
    print("❌ Error al conectar:")
    print(e)
    exit()

# ============================
#   INSERTAR UN REGISTRO
# ============================
try:
    cursor.execute("""
        INSERT INTO visits (name, comment, image_url, public_id)
        VALUES (%s, %s, %s, %s)
        RETURNING *;
    """, (
        "Willian",
        "Prueba monolítica desde Python",
        "https://fake.com/test.jpg",
        "visits/test_monolitico"
    ))

    nuevo = cursor.fetchone()
    conn.commit()

    print("✨ Registro insertado correctamente:")
    print(nuevo)

except Exception as e:
    print("❌ Error en INSERT:")
    print(e)

# ============================
#   SELECT * DESDE LA TABLA
# ============================
try:
    print("\n📌 CONTENIDO COMPLETO DE LA TABLA 'visits':\n")

    cursor.execute("SELECT * FROM visits ORDER BY created_at DESC;")
    registros = cursor.fetchall()

    for r in registros:
        print(r)

except Exception as e:
    print("❌ Error en SELECT:")
    print(e)

# ============================
#   CERRAR CONEXIÓN
# ============================
cursor.close()
conn.close()
print("\n🔚 Conexión cerrada.")
