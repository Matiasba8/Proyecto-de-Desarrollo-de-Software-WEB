# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

professor = Professor.create(email: "mibustos2@miuandes.cl", name: "Matías")
task = Task.create(professor_id: professor.id, name: "First Task", category: "")


student = Student.create(name: "testStudent", email: "test@gmail.com", phone_number: "test", password: "123")

Student.all.each do |student|
  bar_master = Achievement.create(student: student, topic: "Maestro de la barra", amount: 0)
  forces_master = Achievement.create(student: student, topic: "Maestro de las fuerzas", amount: 0)
  momentum_master = Achievement.create(student: student, topic: "Maestro del momentum", amount: 0)
  maestro_vinvulos_externos = Achievement.create(student: student, topic: "Maestro de vinculos externos", amount: 0)
end