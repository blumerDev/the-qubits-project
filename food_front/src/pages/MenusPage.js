import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Card,
  CardContent,
  Fab
} from '@mui/material';
import {
  Add,
  CalendarToday,
  AutoAwesome,
  Edit,
  Visibility
} from '@mui/icons-material';
import { useFood } from '../context/FoodContext';
import WeeklyMenuCard from '../components/menu/WeeklyMenuCard';
import WeeklyMenuView from '../components/menu/WeeklyMenuView';
import { WeeklyMenu } from '../models/WeeklyMenu';

function MenusPage() {
  const { 
    weeklyMenus, 
    currentWeeklyMenu, 
    addWeeklyMenu, 
    setCurrentWeeklyMenu,
    updateWeeklyMenu,
    generateAutoMenu 
  } = useFood();

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showMenuView, setShowMenuView] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [menuForm, setMenuForm] = useState({
    name: '',
    description: '',
    weekStartDate: ''
  });
  const [error, setError] = useState('');

  const handleCreateMenu = () => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1); // Siguiente lunes
    
    setMenuForm({
      name: '',
      description: '',
      weekStartDate: monday.toISOString().split('T')[0]
    });
    setShowCreateDialog(true);
  };

  const handleGenerateAutoMenu = () => {
    try {
      const newMenu = generateAutoMenu({
        // Preferencias por defecto
        tags: ['healthy'],
        maxPreparationTime: 60
      });
      
      setSelectedMenu(newMenu);
      setShowMenuView(true);
    } catch (err) {
      setError('Error al generar el menú automático');
    }
  };

  const handleSaveMenu = () => {
    if (!menuForm.name.trim()) {
      setError('El nombre del menú es requerido');
      return;
    }
    
    if (!menuForm.weekStartDate) {
      setError('La fecha de inicio es requerida');
      return;
    }

    try {
      const newMenu = new WeeklyMenu({
        id: `menu-${Date.now()}`,
        name: menuForm.name.trim(),
        description: menuForm.description.trim(),
        weekStartDate: new Date(menuForm.weekStartDate),
        isActive: weeklyMenus.length === 0 // Primer menú es activo por defecto
      });

      addWeeklyMenu(newMenu);
      
      if (weeklyMenus.length === 0) {
        setCurrentWeeklyMenu(newMenu);
      }

      setShowCreateDialog(false);
      setError('');
    } catch (err) {
      setError('Error al crear el menú');
    }
  };

  const handleMenuSelect = (menu) => {
    setSelectedMenu(menu);
    setShowMenuView(true);
  };

  const handleMenuEdit = (menu) => {
    setSelectedMenu(menu);
    setShowMenuView(true);
  };

  const handleMenuSave = (updatedMenu) => {
    updateWeeklyMenu(updatedMenu);
    setSelectedMenu(updatedMenu);
  };

  const handleSetActive = (menu) => {
    // Desactivar el menú actual
    if (currentWeeklyMenu) {
      const updatedCurrentMenu = { ...currentWeeklyMenu, isActive: false };
      updateWeeklyMenu(updatedCurrentMenu);
    }
    
    // Activar el nuevo menú
    const updatedMenu = { ...menu, isActive: true };
    updateWeeklyMenu(updatedMenu);
    setCurrentWeeklyMenu(updatedMenu);
  };

  const formatDate = (date) => {
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 6);
    
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return `${date.toLocaleDateString('es-ES', options)} - ${endDate.toLocaleDateString('es-ES', options)}`;
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: '#F8FDF6',
      py: 4
    }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography 
              variant="h3" 
              sx={{ 
                color: '#2F4F2F', 
                fontWeight: 700
              }}
            >
              <CalendarToday sx={{ mr: 2, verticalAlign: 'middle' }} />
              Menús Semanales
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<AutoAwesome />}
                onClick={handleGenerateAutoMenu}
                sx={{
                  borderColor: '#7FB069',
                  color: '#7FB069',
                  '&:hover': { 
                    backgroundColor: 'rgba(127, 176, 105, 0.08)',
                    borderColor: '#5C8A4A'
                  }
                }}
              >
                Generar Automático
              </Button>
              
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleCreateMenu}
                sx={{
                  backgroundColor: '#7FB069',
                  '&:hover': { backgroundColor: '#5C8A4A' }
                }}
              >
                Nuevo Menú
              </Button>
            </Box>
          </Box>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#7A8471',
              maxWidth: 800
            }}
          >
            Crea y gestiona menús semanales para organizar tus comidas. Puedes generar menús automáticamente 
            basados en tus preferencias o crear menús personalizados asignando comidas específicas a cada día.
          </Typography>
        </Box>

        {/* Menú actual destacado */}
        {currentWeeklyMenu && (
          <Box sx={{ mb: 6 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                color: '#2F4F2F', 
                fontWeight: 600,
                mb: 3
              }}
            >
              📅 Menú Activo - {formatDate(currentWeeklyMenu.weekStartDate)}
            </Typography>
            
            <Card sx={{ 
              border: '2px solid #7FB069',
              boxShadow: '0 8px 32px rgba(127, 176, 105, 0.2)'
            }}>
              <CardContent sx={{ p: 0 }}>
                <WeeklyMenuCard
                  weeklyMenu={currentWeeklyMenu}
                  onSelect={handleMenuSelect}
                  onEdit={handleMenuEdit}
                  showActions={true}
                />
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Lista de todos los menús */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#2F4F2F', 
              fontWeight: 600,
              mb: 3
            }}
          >
            Todos los Menús ({weeklyMenus.length})
          </Typography>
          
          {weeklyMenus.length === 0 ? (
            <Card sx={{ p: 6, textAlign: 'center', backgroundColor: '#FFFFFF' }}>
              <Typography variant="h6" sx={{ color: '#7A8471', mb: 2 }}>
                Aún no tienes menús semanales
              </Typography>
              <Typography variant="body2" sx={{ color: '#7A8471', mb: 4 }}>
                Crea tu primer menú semanal para empezar a organizar tus comidas
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleCreateMenu}
                  sx={{
                    backgroundColor: '#7FB069',
                    '&:hover': { backgroundColor: '#5C8A4A' }
                  }}
                >
                  Crear Primer Menú
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<AutoAwesome />}
                  onClick={handleGenerateAutoMenu}
                  sx={{
                    borderColor: '#7FB069',
                    color: '#7FB069'
                  }}
                >
                  Generar Automáticamente
                </Button>
              </Box>
            </Card>
          ) : (
            <Grid container spacing={3}>
              {weeklyMenus.map((menu) => (
                <Grid item xs={12} md={6} lg={4} key={menu.id}>
                  <WeeklyMenuCard
                    weeklyMenu={menu}
                    onSelect={handleMenuSelect}
                    onEdit={handleMenuEdit}
                    showActions={true}
                  />
                  
                  {!menu.isActive && (
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleSetActive(menu)}
                        sx={{
                          borderColor: '#7FB069',
                          color: '#7FB069',
                          fontSize: '0.75rem'
                        }}
                      >
                        Activar Menú
                      </Button>
                    </Box>
                  )}
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* FAB para crear menú */}
        <Fab
          color="primary"
          aria-label="add menu"
          onClick={handleCreateMenu}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            backgroundColor: '#7FB069',
            '&:hover': { backgroundColor: '#5C8A4A' }
          }}
        >
          <Add />
        </Fab>

        {/* Dialog para crear menú */}
        <Dialog
          open={showCreateDialog}
          onClose={() => setShowCreateDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            Crear Nuevo Menú Semanal
          </DialogTitle>
          
          <DialogContent sx={{ pt: 2 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre del menú"
                  value={menuForm.name}
                  onChange={(e) => setMenuForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="ej: Menú Saludable Febrero"
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción (opcional)"
                  multiline
                  rows={3}
                  value={menuForm.description}
                  onChange={(e) => setMenuForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe el enfoque de este menú..."
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Fecha de inicio (Lunes)"
                  type="date"
                  value={menuForm.weekStartDate}
                  onChange={(e) => setMenuForm(prev => ({ ...prev, weekStartDate: e.target.value }))}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          
          <DialogActions sx={{ p: 3 }}>
            <Button 
              onClick={() => setShowCreateDialog(false)}
              sx={{ color: '#7A8471' }}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSaveMenu}
              variant="contained"
              sx={{
                backgroundColor: '#7FB069',
                '&:hover': { backgroundColor: '#5C8A4A' }
              }}
            >
              Crear Menú
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog para ver/editar menú completo */}
        <Dialog
          open={showMenuView}
          onClose={() => setShowMenuView(false)}
          maxWidth="xl"
          fullWidth
          PaperProps={{
            sx: { minHeight: '80vh' }
          }}
        >
          <DialogTitle sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <Typography variant="h5" sx={{ color: '#2F4F2F', fontWeight: 600 }}>
              {selectedMenu?.name || 'Menú Semanal'}
            </Typography>
            <Box>
              <Button
                startIcon={<Edit />}
                sx={{ mr: 2, color: '#7FB069' }}
              >
                Modo Edición
              </Button>
            </Box>
          </DialogTitle>
          
          <DialogContent sx={{ pt: 2, px: 3 }}>
            {selectedMenu && (
              <WeeklyMenuView
                weeklyMenu={selectedMenu}
                onSave={handleMenuSave}
                readOnly={false}
              />
            )}
          </DialogContent>
          
          <DialogActions sx={{ p: 3 }}>
            <Button 
              onClick={() => setShowMenuView(false)}
              sx={{ color: '#7A8471' }}
            >
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

export default MenusPage;