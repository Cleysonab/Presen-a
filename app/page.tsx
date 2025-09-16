"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Users, CheckCircle, Clock, Download } from "lucide-react"

// Dados importados da planilha
const initialParticipants = [
  // Adultos (100%)
  { id: 1, name: "Abelle de Deus", category: "adult", price: "100%", confirmed: false },
  { id: 2, name: "Adilson", category: "adult", price: "100%", confirmed: false },
  { id: 3, name: "Adriana", category: "adult", price: "100%", confirmed: false },
  { id: 4, name: "Aguinaldo", category: "adult", price: "100%", confirmed: false },
  { id: 5, name: "Alicia Lopes", category: "adult", price: "100%", confirmed: false },
  { id: 6, name: "Amanda", category: "adult", price: "100%", confirmed: false },
  { id: 7, name: "Ana Beatriz Camargo", category: "adult", price: "100%", confirmed: false },
  { id: 8, name: "Ana Carolina de Paula Rodrigues", category: "adult", price: "100%", confirmed: false },
  { id: 9, name: "Ana Julia Conceição", category: "adult", price: "100%", confirmed: false },
  { id: 10, name: "Ana Maria", category: "adult", price: "100%", confirmed: false },
  { id: 11, name: "Ana Paula Smetana", category: "adult", price: "100%", confirmed: false },
  { id: 12, name: "Andreza", category: "adult", price: "100%", confirmed: false },
  { id: 13, name: "Arthur Maringo", category: "adult", price: "100%", confirmed: false },
  { id: 14, name: "Ashey Lopes", category: "adult", price: "100%", confirmed: false },
  { id: 15, name: "Bianca Zanardi", category: "adult", price: "100%", confirmed: false },
  { id: 16, name: "Brenda Goncalves", category: "adult", price: "100%", confirmed: false },
  { id: 17, name: "Bruna Oliveira", category: "adult", price: "100%", confirmed: false },
  { id: 18, name: "Camila", category: "adult", price: "100%", confirmed: false },
  { id: 19, name: "Camila Querino", category: "adult", price: "100%", confirmed: false },
  { id: 20, name: "Carla", category: "adult", price: "100%", confirmed: false },
  { id: 21, name: "Catia Fonseca", category: "adult", price: "100%", confirmed: false },
  { id: 22, name: "Cesar", category: "adult", price: "100%", confirmed: false },
  { id: 23, name: "Cina", category: "adult", price: "100%", confirmed: false },
  { id: 24, name: "Clara Campiteli", category: "adult", price: "100%", confirmed: false },
  { id: 25, name: "Cristiano Bernando", category: "adult", price: "100%", confirmed: false },
  { id: 26, name: "Cristina Bernando", category: "adult", price: "100%", confirmed: false },
  { id: 27, name: "Daniel", category: "adult", price: "100%", confirmed: false },
  { id: 28, name: "Daniela", category: "adult", price: "100%", confirmed: false },
  { id: 29, name: "Danilo", category: "adult", price: "100%", confirmed: false },
  { id: 30, name: "Debora", category: "adult", price: "100%", confirmed: false },
  { id: 31, name: "Deoclecio", category: "adult", price: "100%", confirmed: false },
  { id: 32, name: "Diego", category: "adult", price: "100%", confirmed: false },
  { id: 33, name: "Eduarda Kilogon", category: "adult", price: "100%", confirmed: false },
  { id: 34, name: "Emerson", category: "adult", price: "100%", confirmed: false },
  { id: 35, name: "Estela", category: "adult", price: "100%", confirmed: false },
  { id: 36, name: "Ester Gonçalves", category: "adult", price: "100%", confirmed: false },
  { id: 37, name: "Ester Miranda", category: "adult", price: "100%", confirmed: false },
  { id: 38, name: "Everton", category: "adult", price: "100%", confirmed: false },
  { id: 39, name: "Fabiana Ortega", category: "adult", price: "100%", confirmed: false },
  { id: 40, name: "Felipe (Gabi)", category: "adult", price: "100%", confirmed: false },
  { id: 41, name: "Felipe Cardoso de Oliveira", category: "adult", price: "100%", confirmed: false },
  { id: 42, name: "Fernando", category: "adult", price: "100%", confirmed: false },
  { id: 43, name: "Flávia", category: "adult", price: "100%", confirmed: false },
  { id: 44, name: "Francisco", category: "adult", price: "100%", confirmed: false },
  { id: 45, name: "Gabriel Machado de Oliveira", category: "adult", price: "100%", confirmed: false },
  { id: 46, name: "Gabriela", category: "adult", price: "100%", confirmed: false },
  { id: 47, name: "Gedalva", category: "adult", price: "100%", confirmed: false },
  { id: 48, name: "Geovanna Almeida", category: "adult", price: "100%", confirmed: false },
  { id: 49, name: "Giovana Cletti", category: "adult", price: "100%", confirmed: false },
  { id: 50, name: "Glayce", category: "adult", price: "100%", confirmed: false },
  { id: 51, name: "Heloisa Olimpio", category: "adult", price: "100%", confirmed: false },
  { id: 52, name: "Hiago", category: "adult", price: "100%", confirmed: false },
  { id: 53, name: "Isabela Doni", category: "adult", price: "100%", confirmed: false },
  { id: 54, name: "Isabelly Rivas", category: "adult", price: "100%", confirmed: false },
  { id: 55, name: "Isabelly Yukari", category: "adult", price: "100%", confirmed: false },
  { id: 56, name: "Ivete", category: "adult", price: "100%", confirmed: false },
  { id: 57, name: "Izolda", category: "adult", price: "100%", confirmed: false },
  { id: 58, name: "Jenifer", category: "adult", price: "100%", confirmed: false },
  { id: 59, name: "Julia do Amaral", category: "adult", price: "100%", confirmed: false },
  { id: 60, name: "Juliana", category: "adult", price: "100%", confirmed: false },
  { id: 61, name: "Juninho", category: "adult", price: "100%", confirmed: false },
  { id: 62, name: "Karollaine Dantas", category: "adult", price: "100%", confirmed: false },
  { id: 63, name: "Katia Kilogon", category: "adult", price: "100%", confirmed: false },
  { id: 64, name: "Kiko", category: "adult", price: "100%", confirmed: false },
  { id: 65, name: "Laís Casteluci", category: "adult", price: "100%", confirmed: false },
  { id: 66, name: "Lara", category: "adult", price: "100%", confirmed: false },
  { id: 67, name: "Larissa", category: "adult", price: "100%", confirmed: false },
  { id: 68, name: "Laura Silva", category: "adult", price: "100%", confirmed: false },
  { id: 69, name: "Leandro", category: "adult", price: "100%", confirmed: false },
  { id: 70, name: "Leticia", category: "adult", price: "100%", confirmed: false },
  { id: 71, name: "Lidia", category: "adult", price: "100%", confirmed: false },
  { id: 72, name: "Lucas (Glayce)", category: "adult", price: "100%", confirmed: false },
  { id: 73, name: "Lucas Golveia", category: "adult", price: "100%", confirmed: false },
  { id: 74, name: "Luis Alberto", category: "adult", price: "100%", confirmed: false },
  { id: 75, name: "Luis Carlos Matias", category: "adult", price: "100%", confirmed: false },
  { id: 76, name: "Lurdinha", category: "adult", price: "100%", confirmed: false },
  { id: 77, name: "Manuela Kaguimoto", category: "adult", price: "100%", confirmed: false },
  { id: 78, name: "Manuela Santana", category: "adult", price: "100%", confirmed: false },
  { id: 79, name: "Maraisa Lopes", category: "adult", price: "100%", confirmed: false },
  { id: 80, name: "Marcela Santana", category: "adult", price: "100%", confirmed: false },
  { id: 81, name: "Marcos Paulo", category: "adult", price: "100%", confirmed: false },
  { id: 82, name: "Maria das Virgens", category: "adult", price: "100%", confirmed: false },
  { id: 83, name: "Mariana de Melo", category: "adult", price: "100%", confirmed: false },
  { id: 84, name: "Melissa Fonseca", category: "adult", price: "100%", confirmed: false },
  { id: 85, name: "Nathan Franchini", category: "adult", price: "100%", confirmed: false },
  { id: 86, name: "Nete", category: "adult", price: "100%", confirmed: false },
  { id: 87, name: "Nicole Fonseca", category: "adult", price: "100%", confirmed: false },
  { id: 88, name: "Patricia", category: "adult", price: "100%", confirmed: false },
  { id: 89, name: "Pedro Henrique Rocha", category: "adult", price: "100%", confirmed: false },
  { id: 90, name: "Priscila", category: "adult", price: "100%", confirmed: false },
  { id: 91, name: "Raquel Rosseto Machado", category: "adult", price: "100%", confirmed: false },
  { id: 92, name: "Rejane", category: "adult", price: "100%", confirmed: false },
  { id: 93, name: "Rodrigo", category: "adult", price: "100%", confirmed: false },
  { id: 94, name: "Roselange", category: "adult", price: "100%", confirmed: false },
  { id: 95, name: "Sandra (Leandro)", category: "adult", price: "100%", confirmed: false },
  { id: 96, name: "Sandra Santana", category: "adult", price: "100%", confirmed: false },
  { id: 97, name: "Sarah Araujo", category: "adult", price: "100%", confirmed: false },
  { id: 98, name: "Sofia Alves", category: "adult", price: "100%", confirmed: false },
  { id: 99, name: "Sophia Goes", category: "adult", price: "100%", confirmed: false },
  { id: 100, name: "Sophia Cristina de Almeida", category: "adult", price: "100%", confirmed: false },
  { id: 101, name: "Sophia Machado", category: "adult", price: "100%", confirmed: false },
  { id: 102, name: "Sofia da Silva Santana", category: "adult", price: "100%", confirmed: false },
  { id: 103, name: "Teo", category: "adult", price: "100%", confirmed: false },
  { id: 104, name: "Thawane", category: "adult", price: "100%", confirmed: false },
  { id: 105, name: "Uriel", category: "adult", price: "100%", confirmed: false },
  { id: 106, name: "Vatinho", category: "adult", price: "100%", confirmed: false },
  { id: 107, name: "Vicente", category: "adult", price: "100%", confirmed: false },
  { id: 108, name: "Victória Querino", category: "adult", price: "100%", confirmed: false },
  { id: 109, name: "Viviane", category: "adult", price: "100%", confirmed: false },
  { id: 110, name: "Wagner Eloy", category: "adult", price: "100%", confirmed: false },
  { id: 111, name: "Wagner Toledo", category: "adult", price: "100%", confirmed: false },
  { id: 112, name: "Wiliam", category: "adult", price: "100%", confirmed: false },

  // Crianças 11-12 anos (50%)
  { id: 113, name: "Matheus", category: "child_11_12", price: "50%", confirmed: false },
  { id: 114, name: "Rafa", category: "child_11_12", price: "50%", confirmed: false },

  // Crianças até 10 anos (isento)
  { id: 115, name: "Alice", category: "child_free", price: "Isento", confirmed: false },
  { id: 116, name: "Ana Beatriz Dos Santos", category: "child_free", price: "Isento", confirmed: false },
  { id: 117, name: "Ana Luisa", category: "child_free", price: "Isento", confirmed: false },
  { id: 118, name: "Caleb", category: "child_free", price: "Isento", confirmed: false },
  { id: 119, name: "David", category: "child_free", price: "Isento", confirmed: false },
  { id: 120, name: "Helena", category: "child_free", price: "Isento", confirmed: false },
  { id: 121, name: "Heloisa Camargo", category: "child_free", price: "Isento", confirmed: false },
  { id: 122, name: "Kaique", category: "child_free", price: "Isento", confirmed: false },
  { id: 123, name: "Lorena Ortega", category: "child_free", price: "Isento", confirmed: false },
  { id: 124, name: "Lucas e Livia", category: "child_free", price: "Isento", confirmed: false },
  { id: 125, name: "Miguel", category: "child_free", price: "Isento", confirmed: false },
  { id: 126, name: "Pedro", category: "child_free", price: "Isento", confirmed: false },
  { id: 127, name: "Perola", category: "child_free", price: "Isento", confirmed: false },
]

type Participant = {
  id: number
  name: string
  category: "adult" | "child_11_12" | "child_free"
  price: string
  confirmed: boolean
}

export default function AttendanceSystem() {
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState<"search" | "confirmed">("search")

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    const savedData = localStorage.getItem("attendanceData")
    if (savedData) {
      setParticipants(JSON.parse(savedData))
    }
  }, [])

  // Salvar dados no localStorage sempre que houver mudanças
  useEffect(() => {
    localStorage.setItem("attendanceData", JSON.stringify(participants))
  }, [participants])

  // Filtrar participantes por busca
  const filteredParticipants = useMemo(() => {
    if (!searchTerm) return participants.filter((p) => !p.confirmed)
    return participants.filter((p) => !p.confirmed && p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [participants, searchTerm])

  // Participantes confirmados por categoria
  const confirmedParticipants = useMemo(() => {
    return participants.filter((p) => p.confirmed)
  }, [participants])

  // Estatísticas
  const stats = useMemo(() => {
    const total = participants.length
    const confirmed = participants.filter((p) => p.confirmed).length
    const pending = total - confirmed

    const adults = participants.filter((p) => p.category === "adult")
    const children11_12 = participants.filter((p) => p.category === "child_11_12")
    const childrenFree = participants.filter((p) => p.category === "child_free")

    return {
      total,
      confirmed,
      pending,
      adults: { total: adults.length, confirmed: adults.filter((p) => p.confirmed).length },
      children11_12: { total: children11_12.length, confirmed: children11_12.filter((p) => p.confirmed).length },
      childrenFree: { total: childrenFree.length, confirmed: childrenFree.filter((p) => p.confirmed).length },
    }
  }, [participants])

  const confirmAttendance = (id: number) => {
    setParticipants((prev) => prev.map((p) => (p.id === id ? { ...p, confirmed: true } : p)))
    setSearchTerm("")
  }

  const undoConfirmation = (id: number) => {
    setParticipants((prev) => prev.map((p) => (p.id === id ? { ...p, confirmed: false } : p)))
  }

  const getCategoryBadge = (category: string, price: string) => {
    switch (category) {
      case "adult":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Adulto - {price}</Badge>
      case "child_11_12":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">11-12 anos - {price}</Badge>
      case "child_free":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Até 10 anos - {price}</Badge>
      default:
        return <Badge variant="secondary">{price}</Badge>
    }
  }

  const exportData = () => {
    const dataStr = JSON.stringify(participants, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `presencas-evento-${new Date().toISOString().split("T")[0]}.json`
    link.click()
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sistema de Confirmação de Presença</h1>
          <p className="text-gray-600">Gerencie a presença dos participantes do evento</p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total de Participantes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Confirmados</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.confirmed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pendentes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Button onClick={exportData} className="w-full bg-transparent" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar Dados
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Detalhes por categoria */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Adultos (100%)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-600">
                {stats.adults.confirmed}/{stats.adults.total}
              </p>
              <p className="text-sm text-gray-600">confirmados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Crianças 11-12 anos (50%)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-orange-600">
                {stats.children11_12.confirmed}/{stats.children11_12.total}
              </p>
              <p className="text-sm text-gray-600">confirmados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Crianças até 10 anos (Isento)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">
                {stats.childrenFree.confirmed}/{stats.childrenFree.total}
              </p>
              <p className="text-sm text-gray-600">confirmados</p>
            </CardContent>
          </Card>
        </div>

        {/* Navegação */}
        <div className="flex space-x-1 mb-6">
          <Button
            variant={selectedTab === "search" ? "default" : "outline"}
            onClick={() => setSelectedTab("search")}
            className="flex-1"
          >
            <Search className="h-4 w-4 mr-2" />
            Confirmar Presença
          </Button>
          <Button
            variant={selectedTab === "confirmed" ? "default" : "outline"}
            onClick={() => setSelectedTab("confirmed")}
            className="flex-1"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Lista de Confirmados ({stats.confirmed})
          </Button>
        </div>

        {/* Conteúdo das abas */}
        {selectedTab === "search" && (
          <div>
            {/* Busca */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Digite o nome do participante..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 text-lg h-12"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Lista de participantes para confirmar */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Participantes Pendentes
                  {searchTerm && ` - Resultados para "${searchTerm}"`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredParticipants.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      {searchTerm ? "Nenhum participante encontrado" : "Todos os participantes já foram confirmados!"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredParticipants.map((participant) => (
                      <div
                        key={participant.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{participant.name}</h3>
                          <div className="mt-1">{getCategoryBadge(participant.category, participant.price)}</div>
                        </div>
                        <Button onClick={() => confirmAttendance(participant.id)} className="ml-4">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Confirmar Presença
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === "confirmed" && (
          <Card>
            <CardHeader>
              <CardTitle>Participantes Confirmados</CardTitle>
            </CardHeader>
            <CardContent>
              {confirmedParticipants.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Nenhum participante confirmado ainda</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {confirmedParticipants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center justify-between p-4 border rounded-lg bg-green-50"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{participant.name}</h3>
                        <div className="mt-1">{getCategoryBadge(participant.category, participant.price)}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Confirmado
                        </Badge>
                        <Button variant="outline" size="sm" onClick={() => undoConfirmation(participant.id)}>
                          Desfazer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
