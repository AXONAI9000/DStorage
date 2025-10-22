import { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Graph, Circle } from '@phosphor-icons/react'
import type { StorageFile, StorageStats } from '@/lib/types'

interface NetworkProps {
  stats: StorageStats
  files: StorageFile[]
}

interface Node {
  id: number
  x: number
  y: number
  radius: number
  hasUserData: boolean
  fileShards: number
}

export default function Network({ stats, files }: NetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [nodes, setNodes] = useState<Node[]>([])
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const generateNodes = () => {
      const nodeCount = Math.min(stats.networkNodes, 50)
      const newNodes: Node[] = []
      const rect = canvas.getBoundingClientRect()
      
      for (let i = 0; i < nodeCount; i++) {
        const totalShards = files.reduce((sum, f) => sum + f.shards, 0)
        const hasUserData = i < Math.min(15, nodeCount) && files.length > 0
        
        newNodes.push({
          id: i,
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          radius: hasUserData ? 6 : 4,
          hasUserData,
          fileShards: hasUserData ? Math.floor(totalShards / 15) + 1 : 0,
        })
      }
      
      setNodes(newNodes)
    }

    generateNodes()

    let animationFrame: number

    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      ctx.strokeStyle = 'rgba(72, 118, 255, 0.1)'
      ctx.lineWidth = 1
      
      nodes.forEach((node, i) => {
        nodes.slice(i + 1).forEach(otherNode => {
          const dx = otherNode.x - node.x
          const dy = otherNode.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)
            ctx.globalAlpha = 1 - distance / 150
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        })
      })

      nodes.forEach(node => {
        node.x += (Math.random() - 0.5) * 0.5
        node.y += (Math.random() - 0.5) * 0.5
        
        if (node.x < 0) node.x = rect.width
        if (node.x > rect.width) node.x = 0
        if (node.y < 0) node.y = rect.height
        if (node.y > rect.height) node.y = 0

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        
        if (node.hasUserData) {
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 3)
          gradient.addColorStop(0, 'rgba(232, 73, 175, 0.3)')
          gradient.addColorStop(1, 'rgba(232, 73, 175, 0)')
          ctx.fillStyle = gradient
          ctx.fill()
          
          ctx.fillStyle = 'rgb(232, 73, 175)'
        } else {
          ctx.fillStyle = 'rgba(72, 118, 255, 0.6)'
        }
        
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fill()

        if (node.hasUserData) {
          ctx.strokeStyle = 'rgba(232, 73, 175, 0.5)'
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2)
          ctx.stroke()
        }
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [stats.networkNodes, files, nodes])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const hoveredNode = nodes.find(node => {
      const dx = node.x - x
      const dy = node.y - y
      const distance = Math.sqrt(dx * dx + dy * dy)
      return distance < node.radius * 2
    })

    setHoveredNode(hoveredNode || null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Network Visualization</h2>
        <p className="text-muted-foreground">Live view of the decentralized storage network</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Network Nodes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.networkNodes}</div>
            <p className="text-xs text-muted-foreground mt-1">Active globally</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Your Nodes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {Math.min(files.reduce((sum, f) => sum + f.shards, 0), 15)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Storing your data</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Network Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">99.8%</div>
            <Badge variant="secondary" className="mt-2">
              <Circle size={8} weight="fill" className="mr-1" />
              Excellent
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Graph size={20} />
            Network Map
          </CardTitle>
          <CardDescription>
            <span className="inline-flex items-center gap-2 mr-4">
              <Circle size={12} weight="fill" className="text-primary" />
              Network Nodes
            </span>
            <span className="inline-flex items-center gap-2">
              <Circle size={12} weight="fill" className="text-accent" />
              Your Data Nodes
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <canvas
              ref={canvasRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setHoveredNode(null)}
              className="w-full h-[500px] rounded-lg border border-border bg-background/50 cursor-crosshair"
            />
            
            {hoveredNode && (
              <div 
                className="absolute bg-card border border-border rounded-lg px-3 py-2 pointer-events-none shadow-lg"
                style={{
                  left: hoveredNode.x + 20,
                  top: hoveredNode.y - 40,
                }}
              >
                <p className="text-xs font-medium">Node #{hoveredNode.id}</p>
                {hoveredNode.hasUserData && (
                  <p className="text-xs text-muted-foreground">
                    Storing {hoveredNode.fileShards} shard{hoveredNode.fileShards !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            )}
          </div>
          
          {files.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg backdrop-blur-sm">
              <div className="text-center">
                <Graph size={48} className="mx-auto mb-3 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground font-medium">Upload files to see your data distribution</p>
                <p className="text-sm text-muted-foreground mt-1">Your files will be distributed across the network</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
