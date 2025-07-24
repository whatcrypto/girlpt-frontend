import os
from supabase import create_client, Client
from typing import Dict, List, Optional, Any
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class SupabaseOperations:
    def __init__(self):
        url = os.getenv("SUPABASE_URL")
        key = os.getenv("SUPABASE_SERVICE_KEY")
        
        if not url or not key:
            raise ValueError("Supabase URL and Service Key must be set in environment variables")
        
        self.client: Client = create_client(url, key)
    
    def get_service_client(self) -> Client:
        """Get the Supabase service client"""
        return self.client
    
    async def get_user_by_clerk_id(self, clerk_id: str) -> Optional[Dict[str, Any]]:
        """Get user by Clerk ID"""
        try:
            response = self.client.table('users').select('*').eq('clerk_user_id', clerk_id).single().execute()
            return response.data
        except Exception as e:
            logger.error(f"Error getting user: {e}")
            return None
    
    async def create_or_update_user(self, email: str, clerk_user_id: Optional[str] = None, **kwargs) -> Optional[Dict[str, Any]]:
        """Create or update user"""
        try:
            user_data = {
                'email': email,
                'updated_at': datetime.now().isoformat()
            }
            
            if clerk_user_id:
                user_data['clerk_user_id'] = clerk_user_id
                
            user_data.update(kwargs)
            
            # Try to update first
            if clerk_user_id:
                response = self.client.table('users').update(user_data).eq('clerk_user_id', clerk_user_id).execute()
                if response.data:
                    return response.data[0]
            
            # If no update, create new
            user_data['created_at'] = datetime.now().isoformat()
            response = self.client.table('users').insert(user_data).execute()
            return response.data[0] if response.data else None
            
        except Exception as e:
            logger.error(f"Error creating/updating user: {e}")
            return None
    
    async def get_companion(self, companion_id: str, user_id: Optional[str] = None) -> Optional[Dict[str, Any]]:
        """Get companion by ID"""
        try:
            query = self.client.table('companions').select('*').eq('id', companion_id)
            if user_id:
                query = query.eq('user_id', user_id)
            response = query.single().execute()
            return response.data
        except Exception as e:
            logger.error(f"Error getting companion: {e}")
            return None
    
    async def create_companion(self, companion_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Create a new companion"""
        try:
            companion_data['created_at'] = datetime.now().isoformat()
            companion_data['updated_at'] = datetime.now().isoformat()
            
            response = self.client.table('companions').insert(companion_data).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            logger.error(f"Error creating companion: {e}")
            return None
    
    async def update_companion(self, companion_id: str, user_id: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Update companion"""
        try:
            updates['updated_at'] = datetime.now().isoformat()
            
            response = self.client.table('companions').update(updates).eq('id', companion_id).eq('user_id', user_id).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            logger.error(f"Error updating companion: {e}")
            return None
    
    async def delete_companion(self, companion_id: str, user_id: str) -> bool:
        """Delete companion"""
        try:
            response = self.client.table('companions').delete().eq('id', companion_id).eq('user_id', user_id).execute()
            return len(response.data) > 0
        except Exception as e:
            logger.error(f"Error deleting companion: {e}")
            return False
    
    async def get_characters_by_user(self, user_id: str) -> List[Dict[str, Any]]:
        """Get all characters for a user"""
        try:
            response = self.client.table('characters').select('*').eq('user_id', user_id).execute()
            return response.data or []
        except Exception as e:
            logger.error(f"Error getting characters: {e}")
            return []
    
    async def get_character(self, character_id: str) -> Optional[Dict[str, Any]]:
        """Get character by ID"""
        try:
            response = self.client.table('characters').select('*').eq('id', character_id).single().execute()
            return response.data
        except Exception as e:
            logger.error(f"Error getting character: {e}")
            return None
    
    # ===== ITEM SYSTEM OPERATIONS =====
    
    async def get_items(self, category: Optional[str] = None) -> List[Dict[str, Any]]:
        """Get all items, optionally filtered by category"""
        try:
            query = self.client.table('items').select('*')
            if category:
                query = query.eq('category', category)
            response = query.order('price', ascending=True).execute()
            return response.data or []
        except Exception as e:
            logger.error(f"Error getting items: {e}")
            return []
    
    async def get_item_by_id(self, item_id: str) -> Optional[Dict[str, Any]]:
        """Get a single item by ID"""
        try:
            response = self.client.table('items').select('*').eq('id', item_id).single().execute()
            return response.data
        except Exception as e:
            logger.error(f"Error getting item: {e}")
            return None
    
    async def get_user_inventory(self, user_id: str, character_id: str) -> List[Dict[str, Any]]:
        """Get user's inventory for a specific character"""
        try:
            response = self.client.table('user_inventory').select(
                '*, item:items(*)'
            ).eq('user_id', user_id).eq('character_id', character_id).execute()
            return response.data or []
        except Exception as e:
            logger.error(f"Error getting inventory: {e}")
            return []
    
    async def add_to_inventory(self, user_id: str, character_id: str, item_id: str) -> Optional[Dict[str, Any]]:
        """Add item to user's inventory"""
        try:
            # Check if already exists
            existing = self.client.table('user_inventory').select('*').eq(
                'user_id', user_id
            ).eq('character_id', character_id).eq('item_id', item_id).execute()
            
            if existing.data:
                # Update quantity
                new_quantity = existing.data[0]['quantity'] + 1
                response = self.client.table('user_inventory').update(
                    {'quantity': new_quantity}
                ).eq('id', existing.data[0]['id']).execute()
                return response.data[0] if response.data else None
            else:
                # Create new entry
                response = self.client.table('user_inventory').insert({
                    'user_id': user_id,
                    'character_id': character_id,
                    'item_id': item_id,
                    'quantity': 1,
                    'equipped': False
                }).execute()
                return response.data[0] if response.data else None
        except Exception as e:
            logger.error(f"Error adding to inventory: {e}")
            return None
    
    async def equip_item(self, user_id: str, character_id: str, item_id: str, equip: bool = True) -> bool:
        """Equip or unequip an item"""
        try:
            # Get item details to check slot
            item = await self.get_item_by_id(item_id)
            if not item:
                return False
            
            # If equipping and item has a slot, unequip other items in same slot
            if equip and item.get('slot'):
                # Get all items in the same slot
                same_slot_items = self.client.table('items').select('id').eq('slot', item['slot']).execute()
                item_ids = [i['id'] for i in same_slot_items.data] if same_slot_items.data else []
                
                # Unequip them
                if item_ids:
                    self.client.table('user_inventory').update(
                        {'equipped': False}
                    ).eq('user_id', user_id).eq('character_id', character_id).eq(
                        'equipped', True
                    ).in_('item_id', item_ids).execute()
            
            # Equip/unequip the item
            response = self.client.table('user_inventory').update(
                {'equipped': equip}
            ).eq('user_id', user_id).eq('character_id', character_id).eq('item_id', item_id).execute()
            
            # Update character's equipped_items
            await self._update_character_equipped_items(character_id)
            
            return len(response.data) > 0 if response.data else False
        except Exception as e:
            logger.error(f"Error equipping item: {e}")
            return False
    
    async def get_character_relationship(self, user_id: str, character_id: str) -> Optional[Dict[str, Any]]:
        """Get or create character relationship"""
        try:
            response = self.client.table('character_relationships').select('*').eq(
                'user_id', user_id
            ).eq('character_id', character_id).single().execute()
            
            if not response.data:
                # Create new relationship
                new_rel = self.client.table('character_relationships').insert({
                    'user_id': user_id,
                    'character_id': character_id,
                    'affection_level': 0,
                    'happiness': 50,
                    'total_gifts_given': 0,
                    'total_spent': 0
                }).execute()
                return new_rel.data[0] if new_rel.data else None
            
            return response.data
        except Exception as e:
            logger.error(f"Error getting relationship: {e}")
            return None
    
    async def update_character_relationship(self, relationship_id: str, updates: Dict[str, Any]) -> bool:
        """Update character relationship stats"""
        try:
            updates['updated_at'] = datetime.now().isoformat()
            response = self.client.table('character_relationships').update(updates).eq('id', relationship_id).execute()
            return len(response.data) > 0 if response.data else False
        except Exception as e:
            logger.error(f"Error updating relationship: {e}")
            return False
    
    async def record_gift_history(self, user_id: str, character_id: str, item_id: str, 
                                 reaction_text: str, affection_change: int) -> bool:
        """Record a gift given to a character"""
        try:
            response = self.client.table('gift_history').insert({
                'user_id': user_id,
                'character_id': character_id,
                'item_id': item_id,
                'reaction_text': reaction_text,
                'affection_change': affection_change
            }).execute()
            return len(response.data) > 0 if response.data else False
        except Exception as e:
            logger.error(f"Error recording gift: {e}")
            return False
    
    async def _update_character_equipped_items(self, character_id: str):
        """Update character's equipped_items JSON field"""
        try:
            # Get all equipped items
            equipped = self.client.table('user_inventory').select(
                '*, item:items(*)'
            ).eq('character_id', character_id).eq('equipped', True).execute()
            
            if not equipped.data:
                # Clear equipped items
                self.client.table('characters').update(
                    {'equipped_items': {}}
                ).eq('id', character_id).execute()
                return
            
            # Build equipped items object
            equipped_items = {}
            for inv in equipped.data:
                if inv['item'] and inv['item'].get('slot'):
                    equipped_items[inv['item']['slot']] = {
                        'item_id': inv['item']['id'],
                        'image_url': inv['item'].get('image_url', ''),
                        'layer_order': inv['item'].get('layer_order', 0)
                    }
            
            # Update character
            self.client.table('characters').update(
                {'equipped_items': equipped_items}
            ).eq('id', character_id).execute()
        except Exception as e:
            logger.error(f"Error updating character equipped items: {e}")