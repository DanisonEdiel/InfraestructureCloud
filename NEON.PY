import psycopg2
from psycopg2.extras import RealDictCursor

# ============================================
# CONFIGURACIÓN DIRECTA (pon tu cadena de Neon)
# ============================================

DATABASE_URL = ""

import psycopg2
from psycopg2.extras import RealDictCursor

# ============================================
# CONFIGURACIÓN DIRECTA (pon tu cadena de Neon)
# ============================================

DATABASE_URL = "postgresql://neondb_owner:npg_IxGQ1nUAiBY8@ep-raspy-cake-ad01wc64-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# ============================================
#   CONEXIÓN A LA BD (manejo limpio)
# ============================================
try:
    conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
    print("✅ Conexión exitosa a Neon\n")

except psycopg2.OperationalError as e:
    print("❌ Error de conexión a Neon:")
    print(e)
    exit()
except Exception as e:
    print("❌ Error inesperado al conectar:")
    print(e)
    exit()

# ============================================
#   INSERTAR UN REGISTRO
# ============================================
try:
    with conn.cursor() as cursor:
        cursor.execute("""
            INSERT INTO visits (name, comment, image_url, public_id)
            VALUES (%s, %s, %s, %s)
            RETURNING *;
        """, (
            "Willian",
            "Prueba monolítica desde Python (versión mejorada)",
            "https://fake.com/test.jpg",
            "visits/test_monolitico"
        ))

        nuevo = cursor.fetchone()
        conn.commit()

        print("✨ Registro insertado correctamente:")
        print(nuevo)

except psycopg2.DataError as e:
    print("❌ Error en los datos enviados:")
    print(e)

except Exception as e:
    print("❌ Error inesperado en INSERT:")
    print(e)

# ============================================
#   SELECT * DESDE LA TABLA
# ============================================
try:
    print("\n📌 CONTENIDO COMPLETO DE LA TABLA 'visits':\n")

    with conn.cursor() as cursor:
        cursor.execute("SELECT * FROM visits ORDER BY created_at DESC;")
        registros = cursor.fetchall()

        for r in registros:
            print(r)

except psycopg2.ProgrammingError as e:
    print("❌ Error al ejecutar SELECT (¿tabla incorrecta?):")
    print(e)

except Exception as e:
    print("❌ Error inesperado en SELECT:")
    print(e)

# ============================================
#   CERRAR CONEXIÓN
# ============================================
finally:
    conn.close()
    print("\n🔚 Conexión cerrada correctamente.")
