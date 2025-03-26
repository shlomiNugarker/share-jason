import { useState, useEffect, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { dynamicItemService, DynamicItem } from "@/services/dynamicItem.service";
import { DynamicSchema } from "@/services/dynamicSchema.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTheme } from "@/context/ThemeContext";
import { 
  Download, 
  Copy, 
  Check, 
  ChevronLeft, 
  Search, 
  Eye, 
  ArrowUpDown, 
  FileJson, 
  Filter, 
  Share2,
  List
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import JsonView from 'react18-json-view';
import 'react18-json-view/src/style.css';


const DynamicItems = () => {
  const { schemaId } = useParams<{ schemaId: string }>();
  const navigate = useNavigate();
  const [items, setItems] = useState<DynamicItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<DynamicItem[]>([]);
  const [schema, setSchema] = useState<DynamicSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [previewItem, setPreviewItem] = useState<DynamicItem | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewAllData, setPreviewAllData] = useState<DynamicItem[] | null>(null);
  const [isPreviewAllOpen, setIsPreviewAllOpen] = useState(false);
  const [compareItems, setCompareItems] = useState<DynamicItem[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<Record<string, string>>({});
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [showApiInfo, setShowApiInfo] = useState(true);

  // Show number of filtered vs total items
  const itemCountText = useMemo(() => {
    if (filteredItems.length === items.length) {
      return `${items.length} פריטים`;
    }
    return `${filteredItems.length} מתוך ${items.length} פריטים`;
  }, [filteredItems.length, items.length]);

  useEffect(() => {
    if (!schemaId) {
      navigate("/schemas");
      return;
    }

    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await dynamicItemService.getAllBySchema(schemaId);
        setItems(response.items);
        setFilteredItems(response.items);
        setSchema(response.schema);
      } catch (error) {
        console.error("Failed to fetch items:", error);
        toast.error("Failed to load items");
        navigate("/schemas");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [schemaId, navigate]);

  // Search and filter functionality
  useEffect(() => {
    let filtered = [...items];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        Object.values(item.data).some(value => 
          value !== null && value !== undefined && 
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    
    // Apply advanced filters
    Object.entries(advancedFilters).forEach(([field, value]) => {
      if (value) {
        filtered = filtered.filter(item => {
          const fieldValue = field === "name" ? item.name : item.data[field];
          return fieldValue !== null && 
                 fieldValue !== undefined && 
                 String(fieldValue).toLowerCase().includes(value.toLowerCase());
        });
      }
    });
    
    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = sortField === "name" ? a.name : a.data[sortField];
      const bValue = sortField === "name" ? b.name : b.data[sortField];
      
      if (aValue === bValue) return 0;
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;
      
      const comparison = String(aValue).localeCompare(String(bValue));
      return sortDirection === "asc" ? comparison : -comparison;
    });
    
    setFilteredItems(filtered);
  }, [items, searchQuery, sortField, sortDirection, advancedFilters]);

  const handlePreview = async (item: DynamicItem) => {
    setPreviewItem(item);
    setPreviewLoading(true);
    setIsPreviewOpen(true);
    // Simulate loading for better UX
    setTimeout(() => setPreviewLoading(false), 500);
  };

  const handlePreviewAll = () => {
    setPreviewAllData(filteredItems);
    setPreviewLoading(true);
    setIsPreviewAllOpen(true);
    // Simulate loading for better UX
    setTimeout(() => setPreviewLoading(false), 500);
  };

  const toggleCompareItem = (item: DynamicItem) => {
    setCompareItems(prev => {
      // Check if item is already in the compare list
      const existingItem = prev.find(i => i._id === item._id);
      
      if (existingItem) {
        // Remove from comparison
        return prev.filter(i => i._id !== item._id);
      } else {
        // Add to comparison (max 3 items)
        if (prev.length < 3) {
          return [...prev, item];
        } else {
          toast.warning("ניתן להשוות עד 3 פריטים");
          return prev;
        }
      }
    });
  };

  const isItemInCompare = (itemId: string) => {
    return compareItems.some(item => item._id === itemId);
  };

  const handleCompare = () => {
    if (compareItems.length < 2) {
      toast.warning("יש לבחור לפחות 2 פריטים להשוואה");
      return;
    }
    setIsCompareOpen(true);
  };

  const handleClearCompare = () => {
    setCompareItems([]);
    setIsCompareOpen(false);
  };

  const handleFilterChange = (field: string, value: string) => {
    setAdvancedFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setAdvancedFilters({});
    setSortField("name");
    setSortDirection("asc");
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק פריט זה?")) {
      try {
        await dynamicItemService.delete(id);
        toast.success("הפריט נמחק בהצלחה");
        setItems((prevItems) => prevItems.filter((item) => item._id !== id));
        // Also remove from compare if it's there
        setCompareItems(prev => prev.filter(item => item._id !== id));
      } catch (error) {
        console.error("Failed to delete item:", error);
        toast.error("שגיאה במחיקת הפריט");
      }
    }
  };

  const handleDownloadJson = () => {
    try {
      // Create a JSON string from the items (filtered or all)
      const dataToExport = filteredItems.length < items.length ? filteredItems : items;
      const jsonData = JSON.stringify(dataToExport, null, 2);
      
      // Create a blob with the JSON data
      const blob = new Blob([jsonData], { type: "application/json" });
      
      // Create a URL for the blob
      const url = URL.createObjectURL(blob);
      
      // Create a temporary download link
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = `${schema?.name || "items"}-${filteredItems.length < items.length ? 'filtered-' : ''}${new Date().toISOString().split("T")[0]}.json`;
      
      // Append to the document, click it, and remove it
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      // Release the object URL
      URL.revokeObjectURL(url);
      
      toast.success("קובץ JSON הורד בהצלחה");
    } catch (error) {
      console.error("Failed to download JSON:", error);
      toast.error("שגיאה בהורדת קובץ JSON");
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedStates(prev => ({ ...prev, [key]: true }));
        setTimeout(() => {
          setCopiedStates(prev => ({ ...prev, [key]: false }));
        }, 2000);
        toast.success("הטקסט הועתק ללוח");
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        toast.error("שגיאה בהעתקת הטקסט");
      });
  };

  if (loading) {
    return <div className={`flex justify-center items-center min-h-[50vh] ${
      isDark ? 'text-[#c9d1d9]' : 'text-gray-500'
    }`}>
      <div className="animate-pulse">Loading...</div>
    </div>;
  }

  if (!schema) {
    return (
      <div className={`container mx-auto py-8 px-4 ${
        isDark ? 'bg-[#0d1117]' : ''
      }`}>
        <div className={`text-center p-10 rounded-xl shadow-sm ${
          isDark ? 'bg-[#161b22] border border-[#30363d] text-[#c9d1d9]' : 'bg-gray-50 text-gray-500'
        }`}>
          <p className="mb-3">Schema not found</p>
          <Link to="/schemas" className={`hover:transition-colors ${
            isDark ? 'text-[#58a6ff] hover:text-[#58a6ff]/90' : 'text-blue-600 hover:text-blue-800'
          }`}>
            Back to schemas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`container mx-auto py-8 px-4 max-w-7xl ${
      isDark ? 'bg-[#0d1117] text-[#c9d1d9]' : ''
    }`}>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <Link to="/schemas" className={`mb-2 inline-flex items-center gap-1 text-sm ${
            isDark ? 'text-[#58a6ff] hover:text-[#58a6ff]/90' : 'text-blue-600 hover:text-blue-800'
          } transition-colors`}>
            <ChevronLeft size={14} />
            Back to schemas
          </Link>
          <h1 className={`text-3xl font-bold mb-1 ${
            isDark ? 'text-[#c9d1d9]' : 'text-gray-900'
          }`}>{schema.name} Items</h1>
          <p className={isDark ? 'text-[#8b949e]' : 'text-gray-600'}>
            {schema.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
          {compareItems.length > 0 && (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleClearCompare}
                size="sm"
                className={`h-10 ${
                  isDark ? 'border-[#30363d] bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d]' : ''
                }`}
              >
                נקה ({compareItems.length})
              </Button>
              <Button 
                onClick={handleCompare}
                disabled={compareItems.length < 2}
                size="sm"
                className={`h-10 ${
                  isDark ? 'bg-[#238636] hover:bg-[#2ea043]' : ''
                }`}
              >
                <Share2 size={16} className="mr-1" />
                השווה פריטים
              </Button>
            </div>
          )}
          <Button 
            variant="outline" 
            onClick={handleDownloadJson}
            disabled={items.length === 0}
            className={`flex items-center gap-1 h-10 ${
              isDark ? 'border-[#30363d] bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d]' : ''
            }`}
          >
            <Download size={16} />
            הורד JSON {filteredItems.length < items.length && "(מסונן)"}
          </Button>
          <Button 
            variant="outline"
            onClick={handlePreviewAll}
            disabled={filteredItems.length === 0}
            className={`flex items-center gap-1 h-10 ${
              isDark ? 'border-[#30363d] bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d]' : ''
            }`}
          >
            <List size={16} className="mr-1" />
            צפה ברשימה כ-JSON
          </Button>
          <Button 
            variant="outline"
            onClick={() => setShowApiInfo(!showApiInfo)}
            className={`h-10 ${
              isDark ? 'border-[#30363d] bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d]' : ''
            }`}
          >
            <FileJson size={16} className="mr-1" />
            {showApiInfo ? "הסתר" : "הצג"} API Endpoints
          </Button>
          <Link to={`/dynamic-items/new/${schemaId}`}>
            <Button className={`h-10 ${
              isDark ? 'bg-[#238636] hover:bg-[#2ea043]' : ''
            }`}>הוסף פריט חדש</Button>
          </Link>
        </div>
      </div>

      {/* API Endpoints Section */}
      {showApiInfo && (
        <div className={`mb-8 p-4 rounded-lg shadow-sm ${
          isDark ? 'bg-[#161b22] border border-[#30363d]' : 'bg-white border border-gray-200'
        } text-sm`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className={`font-semibold ${
              isDark ? 'text-[#c9d1d9]' : 'text-gray-800'
            }`}>API Endpoint for all {schema.name} items</h3>
          </div>
          <div className="flex items-center justify-between">
            <code className={`block overflow-x-auto text-xs p-3 rounded-md ${
              isDark ? 'bg-[#0d1117] border-[#30363d] text-[#c9d1d9]' : 'bg-gray-50 border-gray-100 text-gray-800'
            } border flex-grow font-mono`}>
              GET /api/dynamic-items/schema/{schemaId}
            </code>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => copyToClipboard(`GET /api/dynamic-items/schema/${schemaId}`, `schema-all-${schemaId}`)}
              className={`ml-2 ${
                isDark ? 'text-[#8b949e] hover:text-[#c9d1d9]' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {copiedStates[`schema-all-${schemaId}`] ? <Check size={16} className={isDark ? 'text-[#2ea043]' : 'text-green-600'} /> : <Copy size={16} />}
            </Button>
          </div>
        </div>
      )}

      {/* Search and Filter Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
              isDark ? 'text-[#8b949e]' : 'text-gray-400'
            }`} />
            <Input
              type="text"
              placeholder="חיפוש לפי שם או תוכן..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 ${
                isDark ? 'bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder:text-[#8b949e]' : ''
              }`}
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
              className={`h-10 ${
                isDark ? 'border-[#30363d] bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d]' : ''
              }`}
            >
              {viewMode === "grid" ? "תצוגת טבלה" : "תצוגת קלפים"}
            </Button>
          
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSortDirection(prev => prev === "asc" ? "desc" : "asc")}
              className={`h-10 w-10 shrink-0 ${
                isDark ? 'border-[#30363d] bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d]' : ''
              }`}
              title={sortDirection === "asc" ? "סדר יורד" : "סדר עולה"}
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Advanced Filter Controls */}
        <div className={`flex flex-wrap gap-2 p-3 rounded-md border ${
          isDark ? 'bg-[#161b22] border-[#30363d]' : 'bg-gray-50 border-gray-100'
        }`}>
          <div className="mr-2 flex items-center">
            <Filter size={16} className={`mr-1 ${
              isDark ? 'text-[#8b949e]' : 'text-gray-500'
            }`} />
            <span className={`text-sm font-medium ${
              isDark ? 'text-[#c9d1d9]' : 'text-gray-700'
            }`}>סינון מתקדם:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Input
              type="text"
              placeholder="שם"
              value={advancedFilters.name || ""}
              onChange={(e) => handleFilterChange("name", e.target.value)}
              className={`w-32 h-9 text-sm ${
                isDark ? 'bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder:text-[#8b949e]' : ''
              }`}
            />
            
            {schema.fields.map(field => (
              <Input
                key={field.name}
                type="text"
                placeholder={field.name}
                value={advancedFilters[field.name] || ""}
                onChange={(e) => handleFilterChange(field.name, e.target.value)}
                className={`w-32 h-9 text-sm ${
                  isDark ? 'bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder:text-[#8b949e]' : ''
                }`}
              />
            ))}
            
            {(searchQuery || Object.values(advancedFilters).some(v => v)) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className={`h-9 ${
                  isDark ? 'hover:bg-[#30363d] text-[#c9d1d9]' : ''
                }`}
              >
                נקה מסננים
              </Button>
            )}
          </div>
        </div>
        
        {/* Sort Controls */}
        <div className={`flex items-center gap-2 text-sm ${
          isDark ? 'text-[#8b949e]' : 'text-gray-500'
        }`}>
          <span>מיון לפי:</span>
          <div className="flex flex-wrap gap-1">
            <Button
              variant={sortField === "name" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortField("name")}
              className={`h-7 px-2 py-1 text-xs ${
                isDark && sortField !== "name" ? 'border-[#30363d] bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d]' : ''
              } ${
                isDark && sortField === "name" ? 'bg-[#238636] hover:bg-[#2ea043]' : ''
              }`}
            >
              שם
            </Button>
            {schema.fields.map((field) => (
              <Button
                key={field.name}
                variant={sortField === field.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSortField(field.name)}
                className={`h-7 px-2 py-1 text-xs ${
                  isDark && sortField !== field.name ? 'border-[#30363d] bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d]' : ''
                } ${
                  isDark && sortField === field.name ? 'bg-[#238636] hover:bg-[#2ea043]' : ''
                }`}
              >
                {field.name}
              </Button>
            ))}
          </div>
          
          <div className="ml-auto">
            <span className={`text-sm font-medium ${
              isDark ? 'text-[#c9d1d9]' : ''
            }`}>{itemCountText}</span>
          </div>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className={`max-w-3xl max-h-[80vh] overflow-y-auto ${
          isDark ? 'bg-[#161b22] border-[#30363d] text-[#c9d1d9]' : ''
        }`}>
          <DialogHeader>
            <DialogTitle className={isDark ? 'text-[#c9d1d9]' : ''}>
              {previewItem?.name || "Item Preview"}
            </DialogTitle>
          </DialogHeader>
          {previewLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className={`animate-pulse ${
                isDark ? 'text-[#8b949e]' : 'text-gray-500'
              }`}>Loading preview...</div>
            </div>
          ) : previewItem ? (
            <div className="mt-4">
              <div className={`p-2 mb-4 rounded text-xs ${
                isDark ? 'bg-[#0d1117]' : 'bg-gray-50'
              }`}>
                <code className="font-mono">GET /api/dynamic-items/{previewItem._id}</code>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => copyToClipboard(`GET /api/dynamic-items/${previewItem._id}`, `preview-${previewItem._id}`)}
                  className={`ml-2 h-6 ${
                    isDark ? 'text-[#8b949e] hover:text-[#c9d1d9]' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {copiedStates[`preview-${previewItem._id}`] ? <Check size={12} className={isDark ? 'text-[#2ea043]' : 'text-green-600'} /> : <Copy size={12} />}
                </Button>
              </div>
              <JsonView 
                src={previewItem} 
                collapsed={1}
                enableClipboard
                style={{ 
                  backgroundColor: 'transparent',
                  fontSize: '14px',
                  fontFamily: 'monospace',
                  direction: 'ltr'
                }}
              />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      {/* Preview All Dialog */}
      <Dialog open={isPreviewAllOpen} onOpenChange={setIsPreviewAllOpen}>
        <DialogContent className={`max-w-4xl max-h-[85vh] overflow-y-auto ${
          isDark ? 'bg-[#161b22] border-[#30363d] text-[#c9d1d9]' : ''
        }`}>
          <DialogHeader>
            <DialogTitle className={isDark ? 'text-[#c9d1d9]' : ''}>
              תצוגת כל הפריטים - {filteredItems.length} פריטים
            </DialogTitle>
          </DialogHeader>
          {previewLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className={`animate-pulse ${
                isDark ? 'text-[#8b949e]' : 'text-gray-500'
              }`}>Loading preview...</div>
            </div>
          ) : previewAllData ? (
            <div className="mt-4">
              <div className={`p-2 mb-4 rounded text-xs ${
                isDark ? 'bg-[#0d1117]' : 'bg-gray-50'
              }`}>
                <code className="font-mono">GET /api/dynamic-items/schema/{schemaId}</code>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => copyToClipboard(`GET /api/dynamic-items/schema/${schemaId}`, `preview-all-${schemaId}`)}
                  className={`ml-2 h-6 ${
                    isDark ? 'text-[#8b949e] hover:text-[#c9d1d9]' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {copiedStates[`preview-all-${schemaId}`] ? <Check size={12} className={isDark ? 'text-[#2ea043]' : 'text-green-600'} /> : <Copy size={12} />}
                </Button>
              </div>
              <div className="flex justify-end mb-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleDownloadJson}
                  className={`text-xs h-8 ${
                    isDark ? 'border-[#30363d] bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d]' : ''
                  }`}
                >
                  <Download size={14} className="mr-1" />
                  הורד כקובץ JSON
                </Button>
              </div>
              <JsonView 
                src={previewAllData} 
                collapsed={1}
                enableClipboard
                style={{ 
                  backgroundColor: 'transparent',
                  fontSize: '14px',
                  fontFamily: 'monospace',
                  direction: 'ltr'
                }}
              />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      {/* Compare Dialog */}
      <Dialog open={isCompareOpen} onOpenChange={setIsCompareOpen}>
        <DialogContent className={`max-w-5xl max-h-[85vh] overflow-y-auto ${
          isDark ? 'bg-[#161b22] border-[#30363d] text-[#c9d1d9]' : ''
        }`}>
          <DialogHeader>
            <DialogTitle className={isDark ? 'text-[#c9d1d9]' : ''}>
              השוואת פריטים
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {compareItems.map(item => (
                <div key={item._id} className={`border rounded-lg p-4 ${
                  isDark ? 'bg-[#0d1117] border-[#30363d]' : 'bg-gray-50'
                }`}>
                  <h3 className={`font-bold text-lg border-b pb-2 mb-3 ${
                    isDark ? 'text-[#c9d1d9] border-[#30363d]' : ''
                  }`}>{item.name}</h3>
                  <div className="space-y-2">
                    {schema.fields.map(field => (
                      <div key={field.name} className="grid grid-cols-2 gap-2">
                        <span className={`font-medium text-sm ${
                          isDark ? 'text-[#8b949e]' : 'text-gray-600'
                        }`}>{field.name}:</span>
                        <div className={isDark ? 'text-[#c9d1d9]' : 'text-gray-900'}>
                          {renderFieldValueWithDarkMode(item.data[field.name], field.type, isDark)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <Button 
                variant="outline" 
                onClick={handleClearCompare}
                className={isDark ? 'border-[#30363d] bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d]' : ''}
              >
                סגור
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      {items.length === 0 ? (
        <div className={`text-center p-10 rounded-xl shadow-sm ${
          isDark ? 'bg-[#161b22] border border-[#30363d]' : 'bg-white border border-gray-100'
        }`}>
          <p className={`mb-3 ${
            isDark ? 'text-[#8b949e]' : 'text-gray-500'
          }`}>לא נמצאו פריטים.</p>
          <Link to={`/dynamic-items/new/${schemaId}`} className={`${
            isDark ? 'text-[#58a6ff] hover:text-[#58a6ff]/90' : 'text-blue-600 hover:text-blue-800'
          } transition-colors`}>
            צור פריט ראשון
          </Link>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className={`text-center p-10 rounded-xl shadow-sm ${
          isDark ? 'bg-[#161b22] border border-[#30363d]' : 'bg-white border border-gray-100'
        }`}>
          <p className={`mb-3 ${
            isDark ? 'text-[#8b949e]' : 'text-gray-500'
          }`}>לא נמצאו פריטים התואמים לסינון.</p>
          <Button 
            variant="ghost" 
            onClick={clearAllFilters} 
            className={`${
              isDark ? 'text-[#58a6ff] hover:text-[#58a6ff]/90' : 'text-blue-600 hover:text-blue-800'
            }`}
          >
            נקה מסננים
          </Button>
        </div>
      ) : (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : ""}>
          {filteredItems.map((item) => (
            <Card key={item._id} className={`transition-shadow ${
              isDark 
                ? 'bg-[#161b22] border-[#30363d] hover:shadow-md' 
                : 'border-gray-200 shadow-sm hover:shadow-md'
            } ${viewMode === "table" ? "mb-4" : ""}`}>
              <CardHeader className={`pb-3 border-b ${
                isDark ? 'border-[#30363d]' : 'border-gray-100'
              }`}>
                <div className="flex justify-between items-start">
                  <CardTitle className={`text-xl ${
                    isDark ? 'text-[#c9d1d9]' : 'text-gray-900'
                  }`}>{item.name}</CardTitle>
                  <Button 
                    variant={isItemInCompare(item._id) ? "default" : "ghost"}
                    size="sm"
                    onClick={() => toggleCompareItem(item)}
                    className={`h-8 text-xs ${
                      isDark && !isItemInCompare(item._id) ? 'hover:bg-[#30363d] text-[#c9d1d9]' : ''
                    } ${
                      isDark && isItemInCompare(item._id) ? 'bg-[#238636] hover:bg-[#2ea043]' : ''
                    }`}
                  >
                    <Share2 size={14} className="mr-1" />
                    {isItemInCompare(item._id) ? "הסר מהשוואה" : "הוסף להשוואה"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="mb-5">
                  <h3 className={`font-semibold mb-3 text-sm ${
                    isDark ? 'text-[#c9d1d9]' : 'text-gray-800'
                  }`}>נתונים:</h3>
                  <dl className="grid grid-cols-1 gap-y-3">
                    {schema.fields.map((field) => (
                      <div key={field.name} className="grid grid-cols-3 gap-2">
                        <dt className={`font-medium text-sm col-span-1 ${
                          isDark ? 'text-[#8b949e]' : 'text-gray-600'
                        }`}>{field.name}:</dt>
                        <dd className={`col-span-2 ${
                          isDark ? 'text-[#c9d1d9]' : 'text-gray-900'
                        }`}>
                          {renderFieldValueWithDarkMode(item.data[field.name], field.type, isDark)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className={`mb-5 p-3 rounded-md border ${
                  isDark ? 'bg-[#0d1117] border-[#30363d]' : 'bg-gray-50 border-gray-100'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-semibold text-xs ${
                      isDark ? 'text-[#c9d1d9]' : 'text-gray-700'
                    }`}>API Endpoint</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <code className={`block overflow-x-auto text-xs py-2 px-3 rounded-md border flex-grow font-mono ${
                      isDark ? 'bg-[#161b22] border-[#30363d] text-[#c9d1d9]' : 'bg-white border-gray-100 text-gray-800'
                    }`}>
                      GET /api/dynamic-items/{item._id}
                    </code>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(`GET /api/dynamic-items/${item._id}`, `item-${item._id}`)}
                      className={`ml-2 ${
                        isDark ? 'text-[#8b949e] hover:text-[#c9d1d9]' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {copiedStates[`item-${item._id}`] ? <Check size={16} className={isDark ? 'text-[#2ea043]' : 'text-green-600'} /> : <Copy size={16} />}
                    </Button>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`${
                      isDark ? 'border-[#30363d] bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d]' : 'text-gray-700 hover:text-gray-900'
                    }`}
                    onClick={() => handlePreview(item)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    צפייה
                  </Button>
                  <Link to={`/dynamic-items/edit/${item._id}`}>
                    <Button variant="outline" size="sm" className={`${
                      isDark ? 'border-[#30363d] bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d]' : 'text-gray-700 hover:text-gray-900'
                    }`}>
                      עריכה
                    </Button>
                  </Link>
                  {user?.role === "admin" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(item._id)}
                      className={`${
                        isDark ? 'bg-[#490202] text-[#f85149] hover:bg-[#5a0202] border border-[#f85149]/40' : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                      }`}
                    >
                      מחיקה
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

// Helper function to render field values based on type with dark mode support
function renderFieldValueWithDarkMode(value: any, type: string, isDark: boolean = false) {
  if (value === undefined || value === null) {
    return <span className={isDark ? 'text-[#8b949e]' : 'text-gray-400'}>Not set</span>;
  }

  switch (type) {
    case "boolean":
      return value ? "Yes" : "No";
    case "date":
      return new Date(value).toLocaleDateString();
    case "image":
      return value ? (
        <img 
          src={value} 
          alt="Field image" 
          className="max-h-20 max-w-full object-contain rounded-md" 
        />
      ) : (
        <span className={isDark ? 'text-[#8b949e]' : 'text-gray-400'}>No image</span>
      );
    default:
      return String(value);
  }
}

export default DynamicItems; 