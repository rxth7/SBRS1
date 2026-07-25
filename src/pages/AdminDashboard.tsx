import { useState, useEffect, useRef } from 'react';
import { LogOut, Plus, Trash2, Edit3, Calendar, Newspaper, List, Image, Banknote, Users, FileText, Lock, Trophy } from 'lucide-react';
import { getAdminEvents, addEvent, deleteEvent, updateEvent, uploadEventImage, type UpcomingEvent } from '../lib/eventsStore';
import { getAdminNews, addNews, deleteNews, updateNews, uploadNewsImage, type NewsItem } from '../lib/newsStore';
import { getAdminEventImages, addEventImage, deleteEventImage, updateEventImage, type EventImage } from '../lib/eventImagesStore';
import { getFeeItems, addFeeItem, updateFeeItem, deleteFeeItem, getFeeNotes, addFeeNote, updateFeeNote, deleteFeeNote, type FeeItem, type FeeNote } from '../lib/feeStore';
import { getFaculty, addFaculty, updateFaculty, deleteFaculty, type FacultyMember } from '../lib/facultyStore';
import { getAdminCampusImages, addCampusImage, deleteCampusImage, type CampusImage } from '../lib/campusImagesStore';
import { getAdminAlumniMembers, addAlumniMember, updateAlumniMember, deleteAlumniMember, type AlumniMember } from '../lib/alumniMembersStore';
import { getAdminAlumniMeetImages, addAlumniMeetImage, deleteAlumniMeetImage, type AlumniMeetImage } from '../lib/alumniMeetStore';
import { getAdminSuccessStories, addSuccessStory, updateSuccessStory, deleteSuccessStory, type SuccessStory } from '../lib/successStoriesStore';
import { getAdminAchievements, addAchievement, updateAchievement, deleteAchievement, type Achievement } from '../lib/achievementsStore';
import { supabase } from '../lib/supabase';
import DisclosureLinksAdmin from '../components/DisclosureLinksAdmin';

interface AdminDashboardProps {
  onLogout: () => void;
}

type SidebarTab = 'add-event' | 'view-events' | 'add-news' | 'view-news' | 'add-event-images' | 'add-campus-images' | 'fee-structure' | 'faculty' | 'alumni-associates' | 'alumni-meet' | 'success-stories' | 'achievements' | 'disclosure-links' | 'change-password';

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<SidebarTab>('add-event');
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [eventImages, setEventImages] = useState<EventImage[]>([]);
  const [feeItems, setFeeItems] = useState<FeeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const facultyFileRef = useRef<HTMLInputElement>(null);

  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventSuccess, setEventSuccess] = useState('');
  const [eventError, setEventError] = useState('');
  const [eventUploading, setEventUploading] = useState(false);
  const [eventImageFile, setEventImageFile] = useState<File | null>(null);
  const [eventFileSizeError, setEventFileSizeError] = useState('');
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  const [newsTitle, setNewsTitle] = useState('');
  const [newsDate, setNewsDate] = useState('');
  const [newsDesc, setNewsDesc] = useState('');
  const [newsSuccess, setNewsSuccess] = useState('');
  const [newsError, setNewsError] = useState('');
  const [newsUploading, setNewsUploading] = useState(false);
  const [newsImageFile, setNewsImageFile] = useState<File | null>(null);
  const [newsFileSizeError, setNewsFileSizeError] = useState('');
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);

  const [imageTitle, setImageTitle] = useState('');
  const [imageDate, setImageDate] = useState('');
  const [imageDesc, setImageDesc] = useState('');
  const [imageSuccess, setImageSuccess] = useState('');
  const [imageError, setImageError] = useState('');
  const [imageUploading, setImageUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileSizeError, setFileSizeError] = useState('');
  const [editingImageId, setEditingImageId] = useState<string | null>(null);

  const [feeParticular, setFeeParticular] = useState('');
  const [feLkg, setFeLkg] = useState('');
  const [feeIToV, setFeeIToV] = useState('');
  const [feeViToX, setFeeViToX] = useState('');
  const [feeSortOrder, setFeeSortOrder] = useState('');
  const [editingFeeId, setEditingFeeId] = useState<string | null>(null);
  const [feeSuccess, setFeeSuccess] = useState('');
  const [feeError, setFeeError] = useState('');
  const [feeUploading, setFeeUploading] = useState(false);

  const [feeNotes, setFeeNotes] = useState<FeeNote[]>([]);
  const [noteText, setNoteText] = useState('');
  const [noteSortOrder, setNoteSortOrder] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteSuccess, setNoteSuccess] = useState('');
  const [noteError, setNoteError] = useState('');
  const [noteUploading, setNoteUploading] = useState(false);
  const [resetSent, setResetSent] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [showConfirm, setShowConfirm] = useState(false);

  const [campusImages, setCampusImages] = useState<CampusImage[]>([]);
  const [campusImageName, setCampusImageName] = useState('');
  const [campusImageSort, setCampusImageSort] = useState('');
  const [campusImageFile, setCampusImageFile] = useState<File | null>(null);
  const [campusImagePreview, setCampusImagePreview] = useState('');
  const [campusImageSuccess, setCampusImageSuccess] = useState('');
  const [campusImageError, setCampusImageError] = useState('');
  const [campusImageUploading, setCampusImageUploading] = useState(false);
  const campusFileRef = useRef<HTMLInputElement>(null);

  const [facultyMembers, setFacultyMembers] = useState<FacultyMember[]>([]);
  const [facultyName, setFacultyName] = useState('');
  const [facultyDesignation, setFacultyDesignation] = useState('');
  const [facultyType, setFacultyType] = useState<'primary' | 'secondary'>('primary');
  const [facultySortOrder, setFacultySortOrder] = useState('');
  const [editingFacultyId, setEditingFacultyId] = useState<string | null>(null);
  const [facultyImageFile, setFacultyImageFile] = useState<File | null>(null);
  const [facultyImageUrl, setFacultyImageUrl] = useState('');
  const [facultyImagePreview, setFacultyImagePreview] = useState('');
  const [facultyImageError, setFacultyImageError] = useState('');
  const [facultySuccess, setFacultySuccess] = useState('');
  const [facultyError, setFacultyError] = useState('');
  const [facultyUploading, setFacultyUploading] = useState(false);

  const [alumniMembers, setAlumniMembers] = useState<AlumniMember[]>([]);
  const [editingAlumniId, setEditingAlumniId] = useState<string | null>(null);
  const [alumniName, setAlumniName] = useState('');
  const [alumniDesignation, setAlumniDesignation] = useState('');
  const [alumniIsExecutive, setAlumniIsExecutive] = useState(false);
  const [alumniSortOrder, setAlumniSortOrder] = useState('');
  const [alumniImageFile, setAlumniImageFile] = useState<File | null>(null);
  const [alumniImagePreview, setAlumniImagePreview] = useState('');
  const [alumniSuccess, setAlumniSuccess] = useState('');
  const [alumniError, setAlumniError] = useState('');
  const [alumniUploading, setAlumniUploading] = useState(false);
  const alumniFileRef = useRef<HTMLInputElement>(null);

  const [meetImages, setMeetImages] = useState<AlumniMeetImage[]>([]);
  const [meetImageFile, setMeetImageFile] = useState<File | null>(null);
  const [meetImagePreview, setMeetImagePreview] = useState('');
  const [meetImageSort, setMeetImageSort] = useState('');
  const [meetImageSuccess, setMeetImageSuccess] = useState('');
  const [meetImageError, setMeetImageError] = useState('');
  const [meetImageUploading, setMeetImageUploading] = useState(false);
  const meetFileRef = useRef<HTMLInputElement>(null);

  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null);
  const [storyName, setStoryName] = useState('');
  const [storyBatch, setStoryBatch] = useState('');
  const [storyText, setStoryText] = useState('');
  const [storySuccess, setStorySuccess] = useState('');
  const [storyError, setStoryError] = useState('');
  const [storyUploading, setStoryUploading] = useState(false);

  const [achievementsList, setAchievementsList] = useState<Achievement[]>([]);
  const [editingAchievementId, setEditingAchievementId] = useState<string | null>(null);
  const [achievementTitle, setAchievementTitle] = useState('');
  const [achievementDesc, setAchievementDesc] = useState('');
  const [achievementImageFile, setAchievementImageFile] = useState<File | null>(null);
  const [achievementImagePreview, setAchievementImagePreview] = useState('');
  const [achievementSuccess, setAchievementSuccess] = useState('');
  const [achievementError, setAchievementError] = useState('');
  const [achievementUploading, setAchievementUploading] = useState(false);
  const achievementFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [eventsData, newsData, imagesData, feeData, notesData, facultyData, campusData, alumniData, meetData, storiesData] = await Promise.all([
        getAdminEvents(),
        getAdminNews(),
        getAdminEventImages(),
        getFeeItems(),
        getFeeNotes(),
        getFaculty(),
        getAdminCampusImages(),
        getAdminAlumniMembers(),
        getAdminAlumniMeetImages(),
        getAdminSuccessStories(),
      ]);
      setEvents(eventsData);
      setNews(newsData);
      setEventImages(imagesData);
      setFeeItems(feeData);
      setFeeNotes(notesData);
      setFacultyMembers(facultyData);
      setCampusImages(campusData);
      setAlumniMembers(alumniData);
      setMeetImages(meetData);
      setStories(storiesData);
      try {
        const achievementsData = await getAdminAchievements();
        setAchievementsList(achievementsData);
      } catch { /* achievements table may not exist yet */ }
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setEventError('');
    setEventUploading(true);
    if (!eventTitle.trim() || !eventDate.trim() || !eventDesc.trim()) { setEventUploading(false); return; }

    try {
      await addEvent({ title: eventTitle.trim(), date: eventDate.trim(), description: eventDesc.trim(), image_file: eventImageFile || undefined });
      setEvents(await getAdminEvents());
      setEventTitle('');
      setEventDate('');
      setEventDesc('');
      setEventImageFile(null);
      setEventSuccess('Event added successfully!');
      setTimeout(() => setEventSuccess(''), 3000);
      setActiveTab('view-events');
    } catch (err) {
      setEventError('Failed to add event. Check your Supabase connection.');
    } finally {
      setEventUploading(false);
    }
  };

  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsError('');
    setNewsUploading(true);
    if (!newsTitle.trim() || !newsDesc.trim()) { setNewsUploading(false); return; }

    try {
      await addNews({ title: newsTitle.trim(), date: newsDate.trim(), description: newsDesc.trim(), image_file: newsImageFile || undefined });
      setNews(await getAdminNews());
      setNewsTitle('');
      setNewsDate('');
      setNewsDesc('');
      setNewsImageFile(null);
      setNewsSuccess('News added successfully!');
      setTimeout(() => setNewsSuccess(''), 3000);
      setActiveTab('view-news');
    } catch (err) {
      setNewsError('Failed to add news. Check your Supabase connection.');
    } finally {
      setNewsUploading(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await deleteEvent(id);
      setEvents(await getAdminEvents());
    } catch (err) {
      console.error('Error deleting event:', err);
    }
  };

  const handleEditEvent = (event: UpcomingEvent) => {
    setEditingEventId(event.id);
    setEventTitle(event.title);
    setEventDate(event.date);
    setEventDesc(event.description);
    setEventImageFile(null);
    setActiveTab('add-event');
  };

  const handleUpdateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEventId) return;
    setEventError('');
    setEventUploading(true);

    try {
      const partial: { title: string; date: string; description: string; image_url?: string } = {
        title: eventTitle.trim(),
        date: eventDate.trim(),
        description: eventDesc.trim(),
      };
      if (eventImageFile) {
        partial.image_url = await uploadEventImage(eventImageFile);
      }
      await updateEvent(editingEventId, partial);
      setEvents(await getAdminEvents());
      setEventTitle('');
      setEventDate('');
      setEventDesc('');
      setEventImageFile(null);
      setEditingEventId(null);
      setEventSuccess('Event updated successfully!');
      setTimeout(() => setEventSuccess(''), 3000);
      setActiveTab('view-events');
    } catch (err) {
      setEventError('Failed to update event.');
    } finally {
      setEventUploading(false);
    }
  };

  const handleDeleteNews = async (id: string) => {
    try {
      await deleteNews(id);
      setNews(await getAdminNews());
    } catch (err) {
      console.error('Error deleting news:', err);
    }
  };

  const handleEditNews = (item: NewsItem) => {
    setEditingNewsId(item.id);
    setNewsTitle(item.title);
    setNewsDate(item.date);
    setNewsDesc(item.description);
    setNewsImageFile(null);
    setActiveTab('add-news');
  };

  const handleUpdateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNewsId) return;
    setNewsError('');
    setNewsUploading(true);

    try {
      const partial: { title: string; date: string; description: string; image_url?: string } = {
        title: newsTitle.trim(),
        date: newsDate.trim(),
        description: newsDesc.trim(),
      };
      if (newsImageFile) {
        partial.image_url = await uploadNewsImage(newsImageFile);
      }
      await updateNews(editingNewsId, partial);
      setNews(await getAdminNews());
      setNewsTitle('');
      setNewsDate('');
      setNewsDesc('');
      setNewsImageFile(null);
      setEditingNewsId(null);
      setNewsSuccess('News updated successfully!');
      setTimeout(() => setNewsSuccess(''), 3000);
      setActiveTab('view-news');
    } catch (err) {
      setNewsError('Failed to update news.');
    } finally {
      setNewsUploading(false);
    }
  };

  const compressImage = (base64: string, maxSize: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const formatMatch = base64.match(/^data:(image\/\w+);base64,/);
      const mime = formatMatch ? formatMatch[1] : 'image/jpeg';
      const img = new window.Image();
      img.onload = () => {
        let quality = 0.8;
        let width = img.width;
        let height = img.height;

        const tryCompress = () => {
          const canvas = document.createElement('canvas');
          const MAX_DIM = 1200;
          if (width > MAX_DIM || height > MAX_DIM) {
            const ratio = Math.min(MAX_DIM / width, MAX_DIM / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) { reject(new Error('Canvas context failed')); return; }
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL(mime, quality);
          const size = Math.round((compressed.length * 3) / 4);
          if (size > maxSize && quality > 0.1) {
            quality -= 0.1;
            tryCompress();
          } else {
            resolve(compressed);
          }
        };
        tryCompress();
      };
      img.onerror = () => reject(new Error('Image load failed'));
      img.src = base64;
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      setSelectedFile(null);
      setFileSizeError('');
      return;
    }
    const file = files[0];
    setSelectedFile(file);
    if (file.size > 2 * 1024 * 1024) {
      setFileSizeError('Image size must be 2MB or less.');
    } else {
      setFileSizeError('');
      setImageError('');
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setImageError('');
    setFileSizeError('');

    setImageUploading(true);

    try {
      if (editingImageId) {
        let newSrc: string | undefined;
        if (selectedFile) {
          if (!selectedFile.type.startsWith('image/')) {
            setImageError('Please select an image file.');
            setImageUploading(false);
            return;
          }
          if (selectedFile.size > 2 * 1024 * 1024) {
            setImageError('Image size must be 2MB or less.');
            setImageUploading(false);
            return;
          }
          const reader = new FileReader();
          newSrc = await new Promise<string>((resolve, reject) => {
            reader.onload = async (ev) => {
              try {
                const result = ev.target?.result as string;
                const compressed = await compressImage(result, 1 * 1024 * 1024);
                const match = compressed.match(/^data:(image\/\w+);base64,/);
                const mimeType = match ? match[1] : 'image/jpeg';
                const extension = mimeType.split('/')[1].replace('jpeg', 'jpg').replace('svg+xml', 'svg');
                const base64Data = compressed.replace(/^data:image\/\w+;base64,/, '');
                const byteChars = atob(base64Data);
                const byteArrays: number[] = [];
                for (let i = 0; i < byteChars.length; i++) byteArrays.push(byteChars.charCodeAt(i));
                const blob = new Blob([new Uint8Array(byteArrays)], { type: mimeType });
                const fileName = `event-images/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
                const { error: uploadError } = await supabase.storage.from('event-images').upload(fileName, blob, { contentType: mimeType });
                if (uploadError) throw new Error('Upload failed: ' + uploadError.message);
                const { data: urlData } = supabase.storage.from('event-images').getPublicUrl(fileName);
                resolve(urlData?.publicUrl || '');
              } catch (err) {
                reject(err);
              }
            };
            reader.readAsDataURL(selectedFile);
          });
        }
        await updateEventImage(editingImageId, {
          title: imageTitle.trim(),
          description: imageDesc.trim(),
          date: imageDate.trim(),
          ...(newSrc ? { src: newSrc } : {}),
        });
        setEventImages(await getAdminEventImages());
        setImageSuccess('Image updated!');
      } else {
        if (!selectedFile) {
          setImageError('Please select an image file.');
          setImageUploading(false);
          return;
        }
        if (!selectedFile.type.startsWith('image/')) {
          setImageError('Please select an image file.');
          setImageUploading(false);
          return;
        }
        if (selectedFile.size > 2 * 1024 * 1024) {
          setImageError('Image size must be 2MB or less.');
          setImageUploading(false);
          return;
        }
        const reader = new FileReader();
        await new Promise<void>((resolve, reject) => {
          reader.onload = async (ev) => {
            try {
              const result = ev.target?.result as string;
              const compressed = await compressImage(result, 1 * 1024 * 1024);
              await addEventImage(compressed, imageTitle.trim(), imageDesc.trim(), imageDate.trim());
              resolve();
            } catch (err) {
              reject(err);
            }
          };
          reader.readAsDataURL(selectedFile);
        });
        setEventImages(await getAdminEventImages());
        setImageSuccess('Image uploaded successfully!');
      }
      setImageTitle('');
      setImageDate('');
      setImageDesc('');
      setSelectedFile(null);
      setEditingImageId(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setTimeout(() => setImageSuccess(''), 3000);
    } catch (err) {
      console.error('Upload error:', err);
      const msg = err instanceof Error ? err.message : 'Failed to save image.';
      setImageError(msg);
    } finally {
      setImageUploading(false);
    }
  };

  const handleDeleteEventImage = async (id: string) => {
    try {
      await deleteEventImage(id);
      setEventImages(await getAdminEventImages());
    } catch (err) {
      console.error('Error deleting image:', err);
    }
  };

  const handleEditEventImage = (img: EventImage) => {
    setEditingImageId(img.id);
    setImageTitle(img.title);
    setImageDate(img.date);
    setImageDesc(img.description);
    setSelectedFile(null);
    setFileSizeError('');
    setImageError('');
    setActiveTab('add-event-images');
  };

  const handleFacultyFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      setFacultyImageFile(null);
      setFacultyImageError('');
      return;
    }
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      setFacultyImageFile(null);
      setFacultyImageError('Please select an image file.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setFacultyImageFile(null);
      setFacultyImagePreview('');
      setFacultyImageError('Image size must be 2MB or less.');
      return;
    }
    setFacultyImageFile(file);
    setFacultyImageError('');
    setFacultyImagePreview(URL.createObjectURL(file));
  };

  const removeFacultyImage = () => {
    setFacultyImageFile(null);
    setFacultyImageUrl('');
    setFacultyImagePreview('');
    if (facultyFileRef.current) facultyFileRef.current.value = '';
  };

  const resetFeeForm = () => {
    setFeeParticular('');
    setFeLkg('');
    setFeeIToV('');
    setFeeViToX('');
    setFeeSortOrder('');
    setEditingFeeId(null);
  };

  const handleAddFee = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeeError('');
    setFeeUploading(true);
    if (!feeParticular.trim() || !feLkg.trim() || !feeIToV.trim() || !feeViToX.trim()) { setFeeUploading(false); return; }

    try {
      if (editingFeeId) {
        await updateFeeItem(editingFeeId, {
          particular: feeParticular.trim(),
          lkg: feLkg.trim(),
          i_to_v: feeIToV.trim(),
          vi_to_x: feeViToX.trim(),
          sort_order: parseInt(feeSortOrder) || 0,
        });
      } else {
        await addFeeItem({
          particular: feeParticular.trim(),
          lkg: feLkg.trim(),
          i_to_v: feeIToV.trim(),
          vi_to_x: feeViToX.trim(),
          sort_order: parseInt(feeSortOrder) || 0,
        });
      }
      setFeeItems(await getFeeItems());
      resetFeeForm();
      setFeeSuccess(editingFeeId ? 'Fee item updated!' : 'Fee item added!');
      setTimeout(() => setFeeSuccess(''), 3000);
    } catch (err) {
      setFeeError(`Failed to save fee item: ${JSON.stringify(err)}`);
    } finally {
      setFeeUploading(false);
    }
  };

  const handleEditFee = (item: FeeItem) => {
    setFeeParticular(item.particular);
    setFeLkg(item.lkg);
    setFeeIToV(item.i_to_v);
    setFeeViToX(item.vi_to_x);
    setFeeSortOrder(String(item.sort_order));
    setEditingFeeId(item.id);
    setActiveTab('fee-structure');
  };

  const handleDeleteFee = async (id: string) => {
    try {
      await deleteFeeItem(id);
      setFeeItems(await getFeeItems());
      if (editingFeeId === id) resetFeeForm();
    } catch (err) {
      console.error('Error deleting fee item:', err);
    }
  };

  const resetNoteForm = () => {
    setNoteText('');
    setNoteSortOrder('');
    setEditingNoteId(null);
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    setNoteError('');
    setNoteUploading(true);
    if (!noteText.trim()) { setNoteUploading(false); return; }

    try {
      if (editingNoteId) {
        await updateFeeNote(editingNoteId, noteText.trim(), parseInt(noteSortOrder) || 0);
      } else {
        await addFeeNote(noteText.trim(), parseInt(noteSortOrder) || 0);
      }
      setFeeNotes(await getFeeNotes());
      resetNoteForm();
      setNoteSuccess(editingNoteId ? 'Note updated!' : 'Note added!');
      setTimeout(() => setNoteSuccess(''), 3000);
    } catch (err) {
      setNoteError(`Failed to save note: ${JSON.stringify(err)}`);
    } finally {
      setNoteUploading(false);
    }
  };

  const handleEditNote = (item: FeeNote) => {
    setNoteText(item.note);
    setNoteSortOrder(String(item.sort_order));
    setEditingNoteId(item.id);
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteFeeNote(id);
      setFeeNotes(await getFeeNotes());
      if (editingNoteId === id) resetNoteForm();
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  const resetFacultyForm = () => {
    setFacultyName('');
    setFacultyDesignation('');
    setFacultyType('primary');
    setFacultySortOrder('');
    setFacultyImageFile(null);
    setFacultyImageUrl('');
    setFacultyImagePreview('');
    setFacultyImageError('');
    setEditingFacultyId(null);
  };

  const uploadFacultyImage = async (file: File): Promise<string> => {
    const reader = new FileReader();
    const dataUrl = await new Promise<string>((resolve, reject) => {
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Image read failed'));
      reader.readAsDataURL(file);
    });
    const compressed = await compressImage(dataUrl, 1 * 1024 * 1024);
    const base64Data = compressed.replace(/^data:image\/\w+;base64,/, '');
    const byteChars = atob(base64Data);
    const byteArrays: number[] = [];
    for (let i = 0; i < byteChars.length; i++) byteArrays.push(byteChars.charCodeAt(i));
    const match = compressed.match(/^data:(image\/\w+);base64,/);
    const mimeType = match ? match[1] : 'image/jpeg';
    const extension = mimeType.split('/')[1].replace('jpeg', 'jpg').replace('svg+xml', 'svg');
    const blob = new Blob([new Uint8Array(byteArrays)], { type: mimeType });
    const fileName = `faculty-images/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
    const { error: uploadError } = await supabase.storage
      .from('faculty-images')
      .upload(fileName, blob, { contentType: mimeType });
    if (uploadError) throw new Error('Image upload failed: ' + uploadError.message);
    const { data: urlData } = supabase.storage.from('faculty-images').getPublicUrl(fileName);
    return urlData?.publicUrl || '';
  };

  const handleAddFaculty = async (e: React.FormEvent) => {
    e.preventDefault();
    setFacultyError('');
    setFacultyUploading(true);
    if (!facultyName.trim()) { setFacultyUploading(false); return; }

    try {
      let imageUrl = facultyImageUrl;
      if (facultyImageFile) {
        imageUrl = await uploadFacultyImage(facultyImageFile);
      }

      if (editingFacultyId) {
        await updateFaculty(editingFacultyId, {
          name: facultyName.trim(),
          designation: facultyDesignation.trim(),
          type: facultyType,
          sort_order: parseInt(facultySortOrder) || 0,
          image: imageUrl,
        });
      } else {
        await addFaculty({
          name: facultyName.trim(),
          designation: facultyDesignation.trim(),
          type: facultyType,
          sort_order: parseInt(facultySortOrder) || 0,
          image: imageUrl,
        });
      }
      setFacultyMembers(await getFaculty());
      resetFacultyForm();
      setFacultySuccess(editingFacultyId ? 'Faculty updated!' : 'Faculty added!');
      setTimeout(() => setFacultySuccess(''), 3000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : JSON.stringify(err);
      setFacultyError(`Failed to save faculty: ${msg}`);
    } finally {
      setFacultyUploading(false);
    }
  };

  const handleEditFaculty = (item: FacultyMember) => {
    setFacultyName(item.name);
    setFacultyDesignation(item.designation);
    setFacultyType(item.type);
    setFacultySortOrder(String(item.sort_order));
    setFacultyImageFile(null);
    setFacultyImageUrl(item.image || '');
    setFacultyImagePreview(item.image || '');
    setFacultyImageError('');
    setEditingFacultyId(item.id);
    setActiveTab('faculty');
  };

  const handleDeleteFaculty = async (id: string) => {
    try {
      await deleteFaculty(id);
      setFacultyMembers(await getFaculty());
      if (editingFacultyId === id) resetFacultyForm();
    } catch (err) {
      console.error('Error deleting faculty:', err);
    }
  };

  const handleCampusFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      setCampusImageFile(null);
      setCampusImagePreview('');
      setCampusImageError('');
      return;
    }
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      setCampusImageFile(null);
      setCampusImageError('Please select an image file.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setCampusImageFile(null);
      setCampusImagePreview('');
      setCampusImageError('Image size must be 2MB or less.');
      return;
    }
    setCampusImageFile(file);
    setCampusImageError('');
    setCampusImagePreview(URL.createObjectURL(file));
  };

  const removeCampusImage = () => {
    setCampusImageFile(null);
    setCampusImagePreview('');
    if (campusFileRef.current) campusFileRef.current.value = '';
  };

  const handleAddCampusImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setCampusImageError('');
    setCampusImageUploading(true);

    if (!campusImageFile) {
      setCampusImageError('Please select an image file.');
      setCampusImageUploading(false);
      return;
    }
    if (!campusImageName.trim()) {
      setCampusImageError('Please enter a name for the image.');
      setCampusImageUploading(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const result = ev.target?.result as string;
      try {
        const compressed = await compressImage(result, 1 * 1024 * 1024);
        await addCampusImage(compressed, campusImageName.trim(), parseInt(campusImageSort) || 0);
        setCampusImages(await getAdminCampusImages());
        setCampusImageName('');
        setCampusImageSort('');
        setCampusImageFile(null);
        setCampusImagePreview('');
        if (campusFileRef.current) campusFileRef.current.value = '';
        setCampusImageSuccess('Image uploaded successfully!');
        setTimeout(() => setCampusImageSuccess(''), 3000);
      } catch (err) {
        console.error('Upload error:', err);
        const msg = err instanceof Error ? err.message : 'Failed to upload image.';
        setCampusImageError(msg);
      } finally {
        setCampusImageUploading(false);
      }
    };
    reader.readAsDataURL(campusImageFile);
  };

  const handleDeleteCampusImage = async (id: string) => {
    try {
      await deleteCampusImage(id);
      setCampusImages(await getAdminCampusImages());
    } catch (err) {
      console.error('Error deleting campus image:', err);
    }
  };

  const handleAlumniFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      setAlumniImageFile(null);
      setAlumniImagePreview('');
      return;
    }
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      setAlumniImageFile(null);
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setAlumniImageFile(null);
      setAlumniImagePreview('');
      setAlumniError('Image size must be 2MB or less.');
      return;
    }
    setAlumniImageFile(file);
    setAlumniError('');
    setAlumniImagePreview(URL.createObjectURL(file));
  };

  const removeAlumniImage = () => {
    setAlumniImageFile(null);
    setAlumniImagePreview('');
    if (alumniFileRef.current) alumniFileRef.current.value = '';
  };

  const resetAlumniForm = () => {
    setEditingAlumniId(null);
    setAlumniName('');
    setAlumniDesignation('');
    setAlumniIsExecutive(false);
    setAlumniSortOrder('');
    setAlumniImageFile(null);
    setAlumniImagePreview('');
    setAlumniError('');
  };

  const handleEditAlumni = (item: AlumniMember) => {
    setEditingAlumniId(item.id);
    setAlumniName(item.name);
    setAlumniDesignation(item.designation);
    setAlumniIsExecutive(item.is_executive);
    setAlumniSortOrder(String(item.sort_order));
    setAlumniImageFile(null);
    setAlumniImagePreview(item.image || '');
    setAlumniError('');
    setActiveTab('alumni-associates');
  };

  const handleDeleteAlumni = async (id: string) => {
    try {
      await deleteAlumniMember(id);
      setAlumniMembers(await getAdminAlumniMembers());
      if (editingAlumniId === id) resetAlumniForm();
    } catch (err) {
      console.error('Error deleting alumni member:', err);
    }
  };

  const uploadAlumniImage = async (file: File): Promise<string> => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = async (ev) => {
        try {
          const result = ev.target?.result as string;
          const compressed = await compressImage(result, 1 * 1024 * 1024);
          const match = compressed.match(/^data:(image\/\w+);base64,/);
          const mimeType = match ? match[1] : 'image/jpeg';
          const extension = mimeType.split('/')[1].replace('jpeg', 'jpg').replace('svg+xml', 'svg');
          const byteChars = atob(compressed.replace(/^data:image\/\w+;base64,/, ''));
          const byteArrays: number[] = [];
          for (let i = 0; i < byteChars.length; i++) byteArrays.push(byteChars.charCodeAt(i));
          const blob = new Blob([new Uint8Array(byteArrays)], { type: mimeType });
          const fileName = `alumni-images/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
          const { error: uploadError } = await supabase.storage.from('alumni-images').upload(fileName, blob, { contentType: mimeType });
          if (uploadError) throw new Error('Upload failed: ' + uploadError.message);
          const { data: urlData } = supabase.storage.from('alumni-images').getPublicUrl(fileName);
          resolve(urlData?.publicUrl || '');
        } catch (err) {
          reject(err);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddAlumni = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlumniError('');
    setAlumniUploading(true);
    if (!alumniName.trim()) { setAlumniUploading(false); setAlumniError('Please enter a name.'); return; }

    try {
      let imageUrl = alumniImagePreview;
      if (alumniImageFile) {
        imageUrl = await uploadAlumniImage(alumniImageFile);
      }

      if (editingAlumniId) {
        await updateAlumniMember(editingAlumniId, {
          name: alumniName.trim(),
          designation: alumniIsExecutive ? '' : alumniDesignation.trim(),
          is_executive: alumniIsExecutive,
          sort_order: parseInt(alumniSortOrder) || 0,
          image: imageUrl,
        });
      } else {
        if (!alumniImageFile) { setAlumniUploading(false); setAlumniError('Please select an image.'); return; }
        await addAlumniMember({
          name: alumniName.trim(),
          designation: alumniIsExecutive ? '' : alumniDesignation.trim(),
          is_executive: alumniIsExecutive,
          sort_order: parseInt(alumniSortOrder) || 0,
          image: imageUrl,
        });
      }
      setAlumniMembers(await getAdminAlumniMembers());
      resetAlumniForm();
      setAlumniSuccess(editingAlumniId ? 'Alumni member updated!' : 'Alumni member added!');
      setTimeout(() => setAlumniSuccess(''), 3000);
    } catch (err) {
      console.error('Upload error:', err);
      const msg = err instanceof Error ? err.message : 'Failed to save alumni member.';
      setAlumniError(msg);
    } finally {
      setAlumniUploading(false);
    }
  };

  const handleMeetFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) { setMeetImageFile(null); setMeetImagePreview(''); return; }
    const file = files[0];
    if (!file.type.startsWith('image/')) { setMeetImageFile(null); return; }
    if (file.size > 2 * 1024 * 1024) { setMeetImageFile(null); setMeetImageError('Image must be 2MB or less.'); return; }
    setMeetImageFile(file);
    setMeetImageError('');
    setMeetImagePreview(URL.createObjectURL(file));
  };

  const removeMeetImage = () => {
    setMeetImageFile(null);
    setMeetImagePreview('');
    if (meetFileRef.current) meetFileRef.current.value = '';
  };

  const handleAddMeetImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setMeetImageError('');
    setMeetImageUploading(true);
    if (!meetImageFile) { setMeetImageUploading(false); setMeetImageError('Please select an image.'); return; }

    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const result = ev.target?.result as string;
        const compressed = await compressImage(result, 1 * 1024 * 1024);
        await addAlumniMeetImage(compressed, parseInt(meetImageSort) || 0);
        setMeetImages(await getAdminAlumniMeetImages());
        setMeetImageFile(null);
        setMeetImagePreview('');
        setMeetImageSort('');
        if (meetFileRef.current) meetFileRef.current.value = '';
        setMeetImageSuccess('Image uploaded!');
        setTimeout(() => setMeetImageSuccess(''), 3000);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Upload failed.';
        setMeetImageError(msg);
      } finally {
        setMeetImageUploading(false);
      }
    };
    reader.readAsDataURL(meetImageFile);
  };

  const handleDeleteMeetImage = async (id: string) => {
    try {
      await deleteAlumniMeetImage(id);
      setMeetImages(await getAdminAlumniMeetImages());
    } catch (err) {
      console.error('Error deleting meet image:', err);
    }
  };

  const handleAddStory = async (e: React.FormEvent) => {
    e.preventDefault();
    setStoryError('');
    setStoryUploading(true);
    if (!storyName.trim() || !storyText.trim()) { setStoryUploading(false); setStoryError('Name and story are required.'); return; }

    try {
      if (editingStoryId) {
        await updateSuccessStory(editingStoryId, {
          name: storyName.trim(),
          batch: storyBatch.trim(),
          story: storyText.trim(),
        });
      } else {
        await addSuccessStory({ name: storyName.trim(), batch: storyBatch.trim(), story: storyText.trim() });
      }
      setStories(await getAdminSuccessStories());
      setStoryName('');
      setStoryBatch('');
      setStoryText('');
      setEditingStoryId(null);
      setStorySuccess(editingStoryId ? 'Success story updated!' : 'Success story added!');
      setTimeout(() => setStorySuccess(''), 3000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to save story.';
      setStoryError(msg);
    } finally {
      setStoryUploading(false);
    }
  };

  const handleEditStory = (item: SuccessStory) => {
    setEditingStoryId(item.id);
    setStoryName(item.name);
    setStoryBatch(item.batch);
    setStoryText(item.story);
    setStoryError('');
    setActiveTab('success-stories');
  };

  const handleDeleteStory = async (id: string) => {
    try {
      await deleteSuccessStory(id);
      setStories(await getAdminSuccessStories());
      if (editingStoryId === id) setEditingStoryId(null);
    } catch (err) {
      console.error('Error deleting story:', err);
    }
  };

  const uploadAchievementImage = async (file: File): Promise<string> => {
    const reader = new FileReader();
    const dataUrl = await new Promise<string>((resolve, reject) => {
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Image read failed'));
      reader.readAsDataURL(file);
    });
    const compressed = await compressImage(dataUrl, 1 * 1024 * 1024);
    const base64Data = compressed.replace(/^data:image\/\w+;base64,/, '');
    const byteChars = atob(base64Data);
    const byteArrays: number[] = [];
    for (let i = 0; i < byteChars.length; i++) byteArrays.push(byteChars.charCodeAt(i));
    const match = compressed.match(/^data:(image\/\w+);base64,/);
    const mimeType = match ? match[1] : 'image/jpeg';
    const extension = mimeType.split('/')[1].replace('jpeg', 'jpg').replace('svg+xml', 'svg');
    const blob = new Blob([new Uint8Array(byteArrays)], { type: mimeType });
    const fileName = `achievements-images/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
    const { error: uploadError } = await supabase.storage.from('achievements-images').upload(fileName, blob, { contentType: mimeType });
    if (uploadError) throw new Error('Image upload failed: ' + uploadError.message);
    const { data: urlData } = supabase.storage.from('achievements-images').getPublicUrl(fileName);
    return urlData?.publicUrl || '';
  };

  const handleAchievementFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) { setAchievementImageFile(null); setAchievementImagePreview(''); return; }
    const file = files[0];
    if (!file.type.startsWith('image/')) { setAchievementImageFile(null); return; }
    if (file.size > 2 * 1024 * 1024) {
      setAchievementImageFile(null);
      setAchievementImagePreview('');
      setAchievementError('Image size must be 2MB or less.');
      return;
    }
    setAchievementImageFile(file);
    setAchievementError('');
    setAchievementImagePreview(URL.createObjectURL(file));
  };

  const handleAddAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    setAchievementError('');
    setAchievementUploading(true);
    if (!achievementTitle.trim() || !achievementDesc.trim()) {
      setAchievementUploading(false);
      setAchievementError('Title and description are required.');
      return;
    }
    try {
      let imageUrl = achievementImagePreview;
      if (achievementImageFile) {
        imageUrl = await uploadAchievementImage(achievementImageFile);
      }
      if (editingAchievementId) {
        await updateAchievement(editingAchievementId, {
          title: achievementTitle.trim(),
          description: achievementDesc.trim(),
          image_url: imageUrl,
        });
      } else {
        await addAchievement({
          title: achievementTitle.trim(),
          description: achievementDesc.trim(),
          image_url: imageUrl,
        });
      }
      setAchievementsList(await getAdminAchievements());
      setAchievementTitle('');
      setAchievementDesc('');
      setAchievementImageFile(null);
      setAchievementImagePreview('');
      setEditingAchievementId(null);
      setAchievementSuccess(editingAchievementId ? 'Achievement updated!' : 'Achievement added!');
      setTimeout(() => setAchievementSuccess(''), 3000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to save achievement.';
      setAchievementError(msg);
    } finally {
      setAchievementUploading(false);
    }
  };

  const handleEditAchievement = (item: Achievement) => {
    setEditingAchievementId(item.id);
    setAchievementTitle(item.title);
    setAchievementDesc(item.description);
    setAchievementImagePreview(item.image_url || '');
    setAchievementImageFile(null);
    setAchievementError('');
    setActiveTab('achievements');
  };

  const handleDeleteAchievement = async (id: string) => {
    try {
      await deleteAchievement(id);
      setAchievementsList(await getAdminAchievements());
      if (editingAchievementId === id) setEditingAchievementId(null);
    } catch (err) {
      console.error('Error deleting achievement:', err);
    }
  };

  const sidebarItems = [
    { id: 'add-event' as SidebarTab, label: 'Add New Event', icon: Plus },
    { id: 'view-events' as SidebarTab, label: 'View Events', icon: List },
    { id: 'add-news' as SidebarTab, label: 'Add Latest News', icon: Newspaper },
    { id: 'view-news' as SidebarTab, label: 'View News', icon: List },
    { id: 'add-event-images' as SidebarTab, label: 'Add Event Images', icon: Image },
    { id: 'add-campus-images' as SidebarTab, label: 'Campus Life Images', icon: Image },
    { id: 'fee-structure' as SidebarTab, label: 'Fee Structure', icon: Banknote },
    { id: 'faculty' as SidebarTab, label: 'Faculty', icon: Users },
    { id: 'alumni-associates' as SidebarTab, label: 'Alumni Associates', icon: Users },
    { id: 'alumni-meet' as SidebarTab, label: 'Alumni Meet', icon: Image },
    { id: 'success-stories' as SidebarTab, label: 'Success Stories', icon: Newspaper },
    { id: 'achievements' as SidebarTab, label: 'Achievements', icon: Trophy },
    { id: 'disclosure-links' as SidebarTab, label: 'Disclosure Links', icon: FileText },
    { id: 'change-password' as SidebarTab, label: 'Change Password', icon: Lock },
  ];

  return (
    <div className="min-h-screen bg-ivory">
      {/* Top Navbar */}
      <nav className="bg-slate/95 backdrop-blur-md shadow-lg py-4">
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0 flex-shrink-0">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <img src="/images/logo.webp" alt="SBRS Logo" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block">
              <span className="font-poppins text-sm font-semibold text-saffron uppercase tracking-wider whitespace-nowrap">
                SBRS Admin
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <button
              onClick={() => setShowConfirm(true)}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-ivory/70 hover:text-saffron border border-ivory/20 hover:border-saffron/40 rounded-lg text-[11px] sm:text-sm font-poppins transition-colors duration-300"
            >
              <Lock size={14} className="sm:size-4" />
              <span className="hidden sm:inline">{resetSent === 'sending' ? 'Sending...' : resetSent === 'sent' ? 'Sent!' : 'Change Password'}</span>
              <span className="sm:hidden">{resetSent === 'sending' ? '...' : resetSent === 'sent' ? '✓' : 'Reset'}</span>
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-ivory/70 hover:text-red-400 border border-ivory/20 hover:border-red-400/40 rounded-lg text-[11px] sm:text-sm font-poppins transition-colors duration-300"
            >
              <LogOut size={14} className="sm:size-4" />
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden">Exit</span>
            </button>
          </div>
        </div>
      </nav>
      <div className="max-w-[1400px] mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">

        {/* Mobile Horizontal Menu */}
        <div className="lg:hidden -mt-4 mb-2">
          <div className="bg-white rounded-xl shadow-sm border border-forest/10 p-3">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-2 min-w-max">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-poppins text-xs font-medium whitespace-nowrap transition-all duration-200 border ${
                      activeTab === item.id
                        ? 'bg-saffron text-white border-saffron shadow-sm'
                        : 'bg-white text-forest/60 border-forest/10 hover:bg-ivory hover:border-forest/20'
                    }`}
                  >
                    <item.icon size={16} />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Desktop */}
        <aside className="w-64 flex-shrink-0 hidden lg:block">
          <div className="bg-white rounded-2xl shadow-sm border border-forest/10 overflow-hidden sticky top-8">
            <div className="p-4 border-b border-forest/10">
              <h2 className="font-poppins text-sm font-bold text-forest uppercase tracking-wider">
                Dashboard Menu
              </h2>
            </div>
            <nav className="py-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-5 py-3 text-left font-poppins text-sm transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-saffron/10 text-saffron font-semibold border-r-3 border-saffron'
                      : 'text-forest/60 hover:bg-ivory hover:text-forest'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl shadow-sm border border-forest/10 p-8">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin h-8 w-8 border-4 border-saffron border-t-transparent rounded-full" />
              </div>
            ) : (
              <>
                {/* Add Event */}
                {activeTab === 'add-event' && (
                  <form onSubmit={editingEventId ? handleUpdateEvent : handleAddEvent} className="space-y-5">
                    <h3 className="font-playfair text-xl text-forest font-bold mb-6">{editingEventId ? 'Edit Event' : 'Add New Upcoming Event'}</h3>
                    <div>
                      <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Event Title</label>
                      <input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} placeholder="e.g. Annual Day Celebration"
                        className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors" required />
                    </div>
                    <div>
                      <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Event Date</label>
                      <input type="text" value={eventDate} onChange={(e) => setEventDate(e.target.value)} placeholder="e.g. 15 August 2026"
                        className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors" required />
                    </div>
                    <div>
                      <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Description</label>
                      <textarea value={eventDesc} onChange={(e) => setEventDesc(e.target.value)} rows={4} placeholder="Write a short description about the event..."
                        className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors resize-none" required />
                    </div>
                    <div>
                      <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Event Image <span className="text-forest/40">(optional)</span></label>
                      <input type="file" accept="image/*" onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        if (file && file.size > 2 * 1024 * 1024) { setEventFileSizeError('Max 2MB allowed'); setEventImageFile(null); return; }
                        setEventFileSizeError('');
                        setEventImageFile(file);
                      }} className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-saffron/20 file:text-saffron file:font-semibold file:text-xs hover:file:bg-saffron/30" />
                      {eventFileSizeError && <p className="font-poppins text-xs text-red-500 mt-1">{eventFileSizeError}</p>}
                      {eventImageFile && <p className="font-poppins text-xs text-forest/50 mt-1">{eventImageFile.name}</p>}
                      {editingEventId && !eventImageFile && (
                        <p className="font-poppins text-xs text-forest/40 mt-1">Leave empty to keep current image</p>
                      )}
                    </div>
                    {eventSuccess && <p className="font-poppins text-sm text-green-600 bg-green-50 rounded-lg py-2 px-4">{eventSuccess}</p>}
                    {eventError && <p className="font-poppins text-sm text-red-500 bg-red-50 rounded-lg py-2 px-4">{eventError}</p>}
                    <div className="flex gap-3">
                      <button type="submit" disabled={eventUploading} className="flex-1 py-3 bg-saffron text-forest font-poppins font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-saffron-deep transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                        {eventUploading ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            {editingEventId ? 'Updating...' : 'Adding...'}
                          </span>
                        ) : (
                          editingEventId ? 'Update Event' : 'Add Event'
                        )}
                      </button>
                      {editingEventId && (
                        <button type="button" onClick={() => { setEditingEventId(null); setEventTitle(''); setEventDate(''); setEventDesc(''); setEventImageFile(null); }}
                          className="px-6 py-3 bg-forest/10 text-forest font-poppins font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-forest/20 transition-all duration-300">
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                )}

                {/* View Events */}
                {activeTab === 'view-events' && (
                  <div>
                    <h3 className="font-playfair text-xl text-forest font-bold mb-6 flex items-center gap-2">
                      <Calendar size={20} className="text-saffron" /> Upcoming Events ({events.length})
                    </h3>
                    {events.length === 0 ? (
                      <p className="font-poppins text-forest/40 text-sm text-center py-8">No events added yet.</p>
                    ) : (
                      <div className="space-y-4">
                        {events.map((event) => (
                          <div key={event.id} className="flex items-start gap-4 p-4 bg-ivory rounded-xl border border-forest/10">
                            {event.image_url && (
                              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-poppins text-sm font-semibold text-saffron mb-1">{event.date}</p>
                              <p className="font-poppins text-sm font-medium text-forest mb-1">{event.title}</p>
                              <p className="font-poppins text-xs text-forest/50 line-clamp-2">{event.description}</p>
                            </div>
                            <div className="flex gap-1 flex-shrink-0">
                              <button onClick={() => handleEditEvent(event)} className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <Edit3 size={16} />
                              </button>
                              <button onClick={() => handleDeleteEvent(event.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Add News */}
                {activeTab === 'add-news' && (
                  <form onSubmit={editingNewsId ? handleUpdateNews : handleAddNews} className="space-y-5">
                    <h3 className="font-playfair text-xl text-forest font-bold mb-6">{editingNewsId ? 'Edit News' : 'Add New Latest News'}</h3>
                    <div>
                      <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">News Title</label>
                      <input type="text" value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)} placeholder="e.g. World Environment Day"
                        className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors" required />
                    </div>
                    <div>
                      <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Date <span className="text-forest/40">(optional)</span></label>
                      <input type="text" value={newsDate} onChange={(e) => setNewsDate(e.target.value)} placeholder="e.g. 5 June"
                        className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors" />
                    </div>
                    <div>
                      <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Description</label>
                      <textarea value={newsDesc} onChange={(e) => setNewsDesc(e.target.value)} rows={4} placeholder="Write a short description about the news..."
                        className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors resize-none" required />
                    </div>
                    <div>
                      <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">News Image <span className="text-forest/40">(optional)</span></label>
                      <input type="file" accept="image/*" onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        if (file && file.size > 2 * 1024 * 1024) { setNewsFileSizeError('Max 2MB allowed'); setNewsImageFile(null); return; }
                        setNewsFileSizeError('');
                        setNewsImageFile(file);
                      }} className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-saffron/20 file:text-saffron file:font-semibold file:text-xs hover:file:bg-saffron/30" />
                      {newsFileSizeError && <p className="font-poppins text-xs text-red-500 mt-1">{newsFileSizeError}</p>}
                      {newsImageFile && <p className="font-poppins text-xs text-forest/50 mt-1">{newsImageFile.name}</p>}
                      {editingNewsId && !newsImageFile && (
                        <p className="font-poppins text-xs text-forest/40 mt-1">Leave empty to keep current image</p>
                      )}
                    </div>
                    {newsSuccess && <p className="font-poppins text-sm text-green-600 bg-green-50 rounded-lg py-2 px-4">{newsSuccess}</p>}
                    {newsError && <p className="font-poppins text-sm text-red-500 bg-red-50 rounded-lg py-2 px-4">{newsError}</p>}
                    <div className="flex gap-3">
                      <button type="submit" disabled={newsUploading} className="flex-1 py-3 bg-saffron text-forest font-poppins font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-saffron-deep transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                        {newsUploading ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            {editingNewsId ? 'Updating...' : 'Adding...'}
                          </span>
                        ) : (
                          editingNewsId ? 'Update News' : 'Add News'
                        )}
                      </button>
                      {editingNewsId && (
                        <button type="button" onClick={() => { setEditingNewsId(null); setNewsTitle(''); setNewsDate(''); setNewsDesc(''); setNewsImageFile(null); }}
                          className="px-6 py-3 bg-forest/10 text-forest font-poppins font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-forest/20 transition-all duration-300">
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                )}

                {/* View News */}
                {activeTab === 'view-news' && (
                  <div>
                    <h3 className="font-playfair text-xl text-forest font-bold mb-6 flex items-center gap-2">
                      <Newspaper size={20} className="text-saffron" /> Latest News ({news.length})
                    </h3>
                    {news.length === 0 ? (
                      <p className="font-poppins text-forest/40 text-sm text-center py-8">No news added yet.</p>
                    ) : (
                      <div className="space-y-4">
                        {news.map((item) => (
                          <div key={item.id} className="flex items-start gap-4 p-4 bg-ivory rounded-xl border border-forest/10">
                            {item.image_url && (
                              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              {item.date && <p className="font-poppins text-sm font-semibold text-saffron mb-1">{item.date}</p>}
                              <p className="font-poppins text-sm font-medium text-forest mb-1">{item.title}</p>
                              <p className="font-poppins text-xs text-forest/50 line-clamp-2">{item.description}</p>
                            </div>
                            <div className="flex gap-1 flex-shrink-0">
                              <button onClick={() => handleEditNews(item)} className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <Edit3 size={16} />
                              </button>
                              <button onClick={() => handleDeleteNews(item.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Add Event Images */}
                {activeTab === 'add-event-images' && (
                  <form onSubmit={handleFileUpload} className="space-y-5">
                    <h3 className="font-playfair text-xl text-forest font-bold flex items-center gap-2">
                      <Image size={20} className="text-saffron" /> {editingImageId ? 'Edit Event Image' : 'Add Event Images'}
                    </h3>

                    {editingImageId && (
                      <div className="flex items-center gap-2 bg-saffron/10 rounded-lg px-4 py-3">
                        <span className="font-poppins text-sm text-forest flex-1">Editing: <strong>{imageTitle}</strong></span>
                        <button type="button" onClick={() => { setEditingImageId(null); setImageTitle(''); setImageDate(''); setImageDesc(''); setSelectedFile(null); setImageError(''); if (fileInputRef.current) fileInputRef.current.value = ''; }} className="font-poppins text-xs text-red-500 hover:text-red-600 font-medium uppercase tracking-wider">Cancel</button>
                      </div>
                    )}

                    <div>
                      <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Title</label>
                      <input type="text" value={imageTitle} onChange={(e) => setImageTitle(e.target.value)} placeholder="e.g. Annual Day Celebration"
                        className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors" />
                    </div>
                    <div>
                      <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Date</label>
                      <input type="text" value={imageDate} onChange={(e) => setImageDate(e.target.value)} placeholder="e.g. 15 August 2026"
                        className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors" />
                    </div>
                    <div>
                      <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Description</label>
                      <textarea value={imageDesc} onChange={(e) => setImageDesc(e.target.value)} rows={3} placeholder="Write a short description..."
                        className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors resize-none" />
                    </div>

                    <div>
                      <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Image</label>
                      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect}
                        className="w-full px-4 py-3 rounded-lg bg-ivory border border-dashed border-forest/30 text-forest font-poppins text-sm focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-saffron file:text-forest file:font-poppins file:text-sm file:font-semibold file:uppercase file:tracking-wider file:cursor-pointer" />
                      {selectedFile && !fileSizeError && (
                        <p className="font-poppins text-xs text-forest/50 mt-1">{selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)</p>
                      )}
                      {fileSizeError && <p className="font-poppins text-xs text-red-500 mt-1">{fileSizeError}</p>}
                    </div>

                    {imageSuccess && <p className="font-poppins text-sm text-green-600 bg-green-50 rounded-lg py-2 px-4">{imageSuccess}</p>}
                    {imageError && <p className="font-poppins text-sm text-red-500 bg-red-50 rounded-lg py-2 px-4">{imageError}</p>}

                    <button type="submit" disabled={imageUploading} className="w-full py-3 bg-saffron text-forest font-poppins font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-saffron-deep transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                      {imageUploading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Uploading...
                        </span>
                      ) : (
                        editingImageId ? 'Update Image' : 'Upload Image'
                      )}
                    </button>

                    {/* Uploaded Images Preview */}
                    {eventImages.length > 0 && (
                      <div>
                        <h4 className="font-poppins text-sm font-semibold text-forest mb-4">Added Images ({eventImages.length})</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                          {eventImages.map((img) => (
                            <div key={img.id} className="relative group rounded-xl overflow-hidden border border-forest/10">
                              <div className="aspect-video overflow-hidden">
                                <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                              </div>
                              <div className="p-3">
                                <p className="font-poppins text-xs text-saffron font-semibold">{img.date}</p>
                                <p className="font-poppins text-sm text-forest font-medium truncate">{img.title}</p>
                              </div>
                              <button type="button" onClick={() => handleDeleteEventImage(img.id)}
                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">
                                <Trash2 size={14} />
                              </button>
                              <button type="button" onClick={() => handleEditEventImage(img)}
                                className="absolute top-2 right-9 p-1.5 bg-saffron text-forest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-saffron-deep">
                                <Edit3 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </form>
                )}

                {/* Add Campus Life Images */}
                {activeTab === 'add-campus-images' && (
                  <div className="space-y-8">
                    <h3 className="font-playfair text-xl text-forest font-bold flex items-center gap-2">
                      <Image size={20} className="text-saffron" /> Add Campus Life Images
                    </h3>

                    <form onSubmit={handleAddCampusImage} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Image Name</label>
                          <input type="text" value={campusImageName} onChange={(e) => setCampusImageName(e.target.value)} placeholder="e.g. Science Lab, Playground"
                            className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors" required />
                        </div>
                        <div>
                          <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Sort Order</label>
                          <input type="number" value={campusImageSort} onChange={(e) => setCampusImageSort(e.target.value)} placeholder="0"
                            className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors" />
                        </div>
                        <div>
                          <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Photo</label>
                          <input ref={campusFileRef} type="file" accept="image/*" onChange={handleCampusFileSelect}
                            className="w-full px-4 py-3 rounded-lg bg-ivory border border-dashed border-forest/30 text-forest font-poppins text-sm focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-saffron file:text-forest file:font-poppins file:text-sm file:font-semibold file:uppercase file:tracking-wider file:cursor-pointer" required />
                          {campusImageError && <p className="font-poppins text-xs text-red-500 mt-1">{campusImageError}</p>}
                          {campusImagePreview && (
                            <div className="mt-3 flex items-center gap-3">
                              <img src={campusImagePreview} alt="Preview" className="w-16 h-16 rounded-lg object-cover border border-forest/10" />
                              <button type="button" onClick={removeCampusImage} className="text-xs text-red-500 hover:text-red-600 font-poppins">
                                Remove photo
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {campusImageSuccess && <p className="font-poppins text-sm text-green-600 bg-green-50 rounded-lg py-2 px-4">{campusImageSuccess}</p>}
                      {campusImageError && <p className="font-poppins text-sm text-red-500 bg-red-50 rounded-lg py-2 px-4">{campusImageError}</p>}

                      <button type="submit" disabled={campusImageUploading} className="w-full py-3 bg-saffron text-forest font-poppins font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-saffron-deep transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                        {campusImageUploading ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Uploading...
                          </span>
                        ) : (
                          'Upload Image'
                        )}
                      </button>
                    </form>

                    {campusImages.length > 0 && (
                      <div>
                        <h4 className="font-poppins text-sm font-semibold text-forest mb-4">Added Images ({campusImages.length})</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                          {campusImages.map((img) => (
                            <div key={img.id} className="relative group rounded-xl overflow-hidden border border-forest/10">
                              <div className="aspect-video overflow-hidden">
                                <img src={img.src} alt={img.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="p-3">
                                <p className="font-poppins text-sm text-forest font-medium truncate">{img.name}</p>
                              </div>
                              <button onClick={() => handleDeleteCampusImage(img.id)}
                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Fee Structure */}
                {activeTab === 'fee-structure' && (
                  <div className="space-y-8">
                    <h3 className="font-playfair text-xl text-forest font-bold flex items-center gap-2">
                      <Banknote size={20} className="text-saffron" /> {editingFeeId ? 'Edit Fee Item' : 'Fee Structure'}
                    </h3>

                    <form onSubmit={handleAddFee} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Particular</label>
                          <input type="text" value={feeParticular} onChange={(e) => setFeeParticular(e.target.value)} placeholder="e.g. Tuition Fee"
                            className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors" required />
                        </div>
                        <div>
                          <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">LKG</label>
                          <input type="text" value={feLkg} onChange={(e) => setFeLkg(e.target.value)} placeholder="e.g. ₹ 23,300.00"
                            className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors" required />
                        </div>
                        <div>
                          <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">I to V</label>
                          <input type="text" value={feeIToV} onChange={(e) => setFeeIToV(e.target.value)} placeholder="e.g. ₹ 26,300.00"
                            className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors" required />
                        </div>
                        <div>
                          <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">VI to X</label>
                          <input type="text" value={feeViToX} onChange={(e) => setFeeViToX(e.target.value)} placeholder="e.g. ₹ 31,300.00"
                            className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors" required />
                        </div>
                        <div>
                          <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Sort Order</label>
                          <input type="number" value={feeSortOrder} onChange={(e) => setFeeSortOrder(e.target.value)} placeholder="0"
                            className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors" />
                        </div>
                      </div>

                      {feeSuccess && <p className="font-poppins text-sm text-green-600 bg-green-50 rounded-lg py-2 px-4">{feeSuccess}</p>}
                      {feeError && <p className="font-poppins text-sm text-red-500 bg-red-50 rounded-lg py-2 px-4">{feeError}</p>}

                      <div className="flex gap-3">
                        <button type="submit" disabled={feeUploading} className="flex-1 py-3 bg-saffron text-forest font-poppins font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-saffron-deep transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                          {feeUploading ? (
                            <span className="flex items-center justify-center gap-2">
                              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                              {editingFeeId ? 'Updating...' : 'Adding...'}
                            </span>
                          ) : (
                            editingFeeId ? 'Update Fee Item' : 'Add Fee Item'
                          )}
                        </button>
                        {editingFeeId && (
                          <button type="button" onClick={resetFeeForm} className="py-3 px-6 text-forest/60 font-poppins text-sm border border-forest/20 rounded-lg hover:bg-ivory transition-colors">
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>

                    {/* Fee Items List */}
                    {feeItems.length > 0 && (
                      <div>
                        <h4 className="font-poppins text-sm font-semibold text-forest mb-4">Fee Items ({feeItems.length})</h4>
                        <div className="space-y-3">
                          {feeItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between gap-4 p-4 bg-ivory rounded-xl border border-forest/10">
                              <div className="flex-1 min-w-0">
                                <p className="font-poppins text-sm font-medium text-forest">{item.particular}</p>
                                <p className="font-poppins text-xs text-forest/50">LKG: {item.lkg} | I-V: {item.i_to_v} | VI-X: {item.vi_to_x}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <button onClick={() => handleEditFee(item)} className="p-2 text-saffron hover:text-saffron-deep hover:bg-saffron/10 rounded-lg transition-colors">
                                  <Edit3 size={16} />
                                </button>
                                <button onClick={() => handleDeleteFee(item.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Notes Section */}
                    <div className="border-t border-forest/10 pt-8 mt-8">
                      <h4 className="font-playfair text-lg text-forest font-bold flex items-center gap-2 mb-6">
                        <Edit3 size={18} className="text-saffron" /> {editingNoteId ? 'Edit Note' : 'Notes'}
                      </h4>

                      <form onSubmit={handleAddNote} className="space-y-4">
                        <div>
                          <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Note</label>
                          <textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="Enter note text"
                            className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors resize-none h-20" required />
                        </div>
                        <div>
                          <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Sort Order</label>
                          <input type="number" value={noteSortOrder} onChange={(e) => setNoteSortOrder(e.target.value)} placeholder="0"
                            className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors" />
                        </div>

                        {noteSuccess && <p className="font-poppins text-sm text-green-600 bg-green-50 rounded-lg py-2 px-4">{noteSuccess}</p>}
                        {noteError && <p className="font-poppins text-sm text-red-500 bg-red-50 rounded-lg py-2 px-4">{noteError}</p>}

                        <div className="flex gap-3">
                          <button type="submit" disabled={noteUploading} className="flex-1 py-3 bg-saffron text-forest font-poppins font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-saffron-deep transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                            {noteUploading ? (
                              <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                {editingNoteId ? 'Updating...' : 'Adding...'}
                              </span>
                            ) : (
                              editingNoteId ? 'Update Note' : 'Add Note'
                            )}
                          </button>
                          {editingNoteId && (
                            <button type="button" onClick={resetNoteForm} className="py-3 px-6 text-forest/60 font-poppins text-sm border border-forest/20 rounded-lg hover:bg-ivory transition-colors">
                              Cancel
                            </button>
                          )}
                        </div>
                      </form>

                      {feeNotes.length > 0 && (
                        <div className="mt-6">
                          <h5 className="font-poppins text-sm font-semibold text-forest mb-4">Notes ({feeNotes.length})</h5>
                          <div className="space-y-3">
                            {feeNotes.map((item) => (
                              <div key={item.id} className="flex items-center justify-between gap-4 p-4 bg-ivory rounded-xl border border-forest/10">
                                <div className="flex-1 min-w-0">
                                  <p className="font-poppins text-sm text-forest">{item.note}</p>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  <button onClick={() => handleEditNote(item)} className="p-2 text-saffron hover:text-saffron-deep hover:bg-saffron/10 rounded-lg transition-colors">
                                    <Edit3 size={16} />
                                  </button>
                                  <button onClick={() => handleDeleteNote(item.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                    <Trash2 size={16} />
</button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Faculty */}
                {activeTab === 'faculty' && (
                  <div className="space-y-8">
                    <h3 className="font-playfair text-xl text-forest font-bold flex items-center gap-2">
                      <Users size={20} className="text-saffron" /> {editingFacultyId ? 'Edit Faculty' : 'Add Faculty'}
                    </h3>

                    <form onSubmit={handleAddFaculty} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Name</label>
                          <input type="text" value={facultyName} onChange={(e) => setFacultyName(e.target.value)} placeholder="e.g. Mrs. Smitha, M.A., B.Ed."
                            className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors" required />
                        </div>
                        <div>
                          <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Designation</label>
                          <input type="text" value={facultyDesignation} onChange={(e) => setFacultyDesignation(e.target.value)} placeholder="e.g. Principal (leave empty if none)"
                            className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors" />
                        </div>
                        <div>
                          <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Type</label>
                          <select value={facultyType} onChange={(e) => setFacultyType(e.target.value as 'primary' | 'secondary')}
                            className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors">
                            <option value="primary">Primary</option>
                            <option value="secondary">Secondary</option>
                          </select>
                        </div>
                        <div>
                          <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Sort Order</label>
                          <input type="number" value={facultySortOrder} onChange={(e) => setFacultySortOrder(e.target.value)} placeholder="0"
                            className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Photo</label>
                          <input ref={facultyFileRef} type="file" accept="image/*" onChange={handleFacultyFileSelect}
                            className="w-full px-4 py-3 rounded-lg bg-ivory border border-dashed border-forest/30 text-forest font-poppins text-sm focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-saffron file:text-forest file:font-poppins file:text-sm file:font-semibold file:uppercase file:tracking-wider file:cursor-pointer" />
                          {facultyImageError && <p className="font-poppins text-xs text-red-500 mt-1">{facultyImageError}</p>}
                          {facultyImagePreview && (
                            <div className="mt-3 flex items-center gap-3">
                              <img src={facultyImagePreview} alt="Preview" className="w-16 h-16 rounded-lg object-cover border border-forest/10" />
                              <button type="button" onClick={removeFacultyImage} className="text-xs text-red-500 hover:text-red-600 font-poppins">
                                Remove photo
                              </button>
                            </div>
                          )}
                          {!facultyImagePreview && facultyImageUrl && (
                            <p className="font-poppins text-xs text-forest/50 mt-1">Current photo is kept. Select a new file to replace it.</p>
                          )}
                        </div>
                      </div>

                      {facultySuccess && <p className="font-poppins text-sm text-green-600 bg-green-50 rounded-lg py-2 px-4">{facultySuccess}</p>}
                      {facultyError && <p className="font-poppins text-sm text-red-500 bg-red-50 rounded-lg py-2 px-4">{facultyError}</p>}

                      <div className="flex gap-3">
                        <button type="submit" disabled={facultyUploading} className="flex-1 py-3 bg-saffron text-forest font-poppins font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-saffron-deep transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                          {facultyUploading ? (
                            <span className="flex items-center justify-center gap-2">
                              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                              {editingFacultyId ? 'Updating...' : 'Adding...'}
                            </span>
                          ) : (
                            editingFacultyId ? 'Update Faculty' : 'Add Faculty'
                          )}
                        </button>
                        {editingFacultyId && (
                          <button type="button" onClick={resetFacultyForm} className="py-3 px-6 text-forest/60 font-poppins text-sm border border-forest/20 rounded-lg hover:bg-ivory transition-colors">
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>

                    {facultyMembers.length > 0 && (
                      <div>
                        <h4 className="font-poppins text-sm font-semibold text-forest mb-4">Faculty ({facultyMembers.length})</h4>
                        <div className="space-y-3">
                          {facultyMembers.map((item) => (
                            <div key={item.id} className="flex items-center justify-between gap-4 p-4 bg-ivory rounded-xl border border-forest/10">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate shrink-0">
                                  <img
                                    src={item.image || '/images/faculty-placeholder.svg'}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="min-w-0">
                                  <p className="font-poppins text-sm font-medium text-forest truncate">{item.name}</p>
                                  <p className="font-poppins text-xs text-forest/50">
                                    {item.type === 'primary' ? 'Primary' : 'Secondary'}
                                    {item.designation ? ` — ${item.designation}` : ''}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <button onClick={() => handleEditFaculty(item)} className="p-2 text-saffron hover:text-saffron-deep hover:bg-saffron/10 rounded-lg transition-colors">
                                  <Edit3 size={16} />
                                </button>
                                <button onClick={() => handleDeleteFaculty(item.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {activeTab === 'alumni-associates' && (
                  <div className="space-y-8">
                    <h3 className="font-playfair text-xl text-forest font-bold flex items-center gap-2">
                      <Users size={20} className="text-saffron" /> {editingAlumniId ? 'Edit Alumni Member' : 'Add Alumni Member'}
                    </h3>

                    {editingAlumniId && (
                      <div className="flex items-center gap-2 bg-saffron/10 rounded-lg px-4 py-3">
                        <span className="font-poppins text-sm text-forest flex-1">Editing: <strong>{alumniName}</strong></span>
                        <button type="button" onClick={resetAlumniForm} className="font-poppins text-xs text-red-500 hover:text-red-600 font-medium uppercase tracking-wider">Cancel</button>
                      </div>
                    )}

                    <form onSubmit={handleAddAlumni} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Name</label>
                          <input type="text" value={alumniName} onChange={(e) => setAlumniName(e.target.value)} placeholder="e.g. Mr. John Doe"
                            className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors" required />
                        </div>
                        <div>
                          <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Is Executive Member?</label>
                          <select value={alumniIsExecutive ? 'yes' : 'no'} onChange={(e) => setAlumniIsExecutive(e.target.value === 'yes')}
                            className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors">
                            <option value="no">No — Other Position</option>
                            <option value="yes">Yes — Executive Member</option>
                          </select>
                        </div>
                        {!alumniIsExecutive && (
                          <div>
                            <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Designation</label>
                            <input type="text" value={alumniDesignation} onChange={(e) => setAlumniDesignation(e.target.value)} placeholder="e.g. Vice President, Treasurer"
                              className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors" />
                          </div>
                        )}
                        <div>
                          <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Sort Order</label>
                          <input type="number" value={alumniSortOrder} onChange={(e) => setAlumniSortOrder(e.target.value)} placeholder="0"
                            className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Photo</label>
                          <input ref={alumniFileRef} type="file" accept="image/*" onChange={handleAlumniFileSelect}
                            className="w-full px-4 py-3 rounded-lg bg-ivory border border-dashed border-forest/30 text-forest font-poppins text-sm focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-saffron file:text-forest file:font-poppins file:text-sm file:font-semibold file:uppercase file:tracking-wider file:cursor-pointer" />
                          {alumniImagePreview && (
                            <div className="mt-3 flex items-center gap-3">
                              <img src={alumniImagePreview} alt="Preview" className="w-16 h-16 rounded-lg object-cover border border-forest/10" />
                              <button type="button" onClick={removeAlumniImage} className="text-xs text-red-500 hover:text-red-600 font-poppins">Remove photo</button>
                            </div>
                          )}
                        </div>
                      </div>

                      {alumniSuccess && <p className="font-poppins text-sm text-green-600 bg-green-50 rounded-lg py-2 px-4">{alumniSuccess}</p>}
                      {alumniError && <p className="font-poppins text-sm text-red-500 bg-red-50 rounded-lg py-2 px-4">{alumniError}</p>}

                      <button type="submit" disabled={alumniUploading} className="w-full py-3 bg-saffron text-forest font-poppins font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-saffron-deep transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                        {alumniUploading ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            {editingAlumniId ? 'Updating...' : 'Adding...'}
                          </span>
                        ) : (editingAlumniId ? 'Update Alumni Member' : 'Add Alumni Member')}
                      </button>
                    </form>

                    {alumniMembers.length > 0 && (
                      <div>
                        <h4 className="font-poppins text-sm font-semibold text-forest mb-4">Alumni Members ({alumniMembers.length})</h4>
                        <div className="space-y-3">
                          {alumniMembers.map((item) => (
                            <div key={item.id} className="flex items-center justify-between gap-4 p-4 bg-ivory rounded-xl border border-forest/10">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate shrink-0">
                                  <img src={item.image || '/images/faculty-placeholder.svg'} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="min-w-0">
                                  <p className="font-poppins text-sm font-medium text-forest truncate">{item.name}</p>
                                  <p className="font-poppins text-xs text-forest/50">
                                    {item.is_executive ? 'Executive Member' : (item.designation || 'Member')}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <button onClick={() => handleEditAlumni(item)} className="p-2 text-saffron hover:text-saffron-deep hover:bg-saffron/10 rounded-lg transition-colors">
                                  <Edit3 size={16} />
                                </button>
                                <button onClick={() => handleDeleteAlumni(item.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {activeTab === 'alumni-meet' && (
                  <div className="space-y-8">
                    <h3 className="font-playfair text-xl text-forest font-bold flex items-center gap-2">
                      <Image size={20} className="text-saffron" /> Alumni Meet Images
                    </h3>

                    <form onSubmit={handleAddMeetImage} className="space-y-4">
                      <div>
                        <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Sort Order</label>
                        <input type="number" value={meetImageSort} onChange={(e) => setMeetImageSort(e.target.value)} placeholder="0"
                          className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors" />
                      </div>
                      <div>
                        <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Photo</label>
                        <input ref={meetFileRef} type="file" accept="image/*" onChange={handleMeetFileSelect}
                          className="w-full px-4 py-3 rounded-lg bg-ivory border border-dashed border-forest/30 text-forest font-poppins text-sm focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-saffron file:text-forest file:font-poppins file:text-sm file:font-semibold file:uppercase file:tracking-wider file:cursor-pointer" />
                        {meetImagePreview && (
                          <div className="mt-3 flex items-center gap-3">
                            <img src={meetImagePreview} alt="Preview" className="w-20 h-20 rounded-lg object-cover border border-forest/10" />
                            <button type="button" onClick={removeMeetImage} className="text-xs text-red-500 hover:text-red-600 font-poppins">Remove</button>
                          </div>
                        )}
                      </div>

                      {meetImageSuccess && <p className="font-poppins text-sm text-green-600 bg-green-50 rounded-lg py-2 px-4">{meetImageSuccess}</p>}
                      {meetImageError && <p className="font-poppins text-sm text-red-500 bg-red-50 rounded-lg py-2 px-4">{meetImageError}</p>}

                      <button type="submit" disabled={meetImageUploading} className="w-full py-3 bg-saffron text-forest font-poppins font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-saffron-deep transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                        {meetImageUploading ? 'Uploading...' : 'Upload Image'}
                      </button>
                    </form>

                    {meetImages.length > 0 && (
                      <div>
                        <h4 className="font-poppins text-sm font-semibold text-forest mb-4">Uploaded Images ({meetImages.length})</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {meetImages.map((img) => (
                            <div key={img.id} className="relative group rounded-xl overflow-hidden shadow-md border border-forest/10">
                              <img src={img.src} alt="Alumni Meet" className="w-full h-36 object-cover" />
                              <button onClick={() => handleDeleteMeetImage(img.id)} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {activeTab === 'success-stories' && (
                  <div className="space-y-8">
<h3 className="font-playfair text-xl text-forest font-bold flex items-center gap-2">
                       <Newspaper size={20} className="text-saffron" /> {editingStoryId ? 'Edit Success Story' : 'Add Success Story'}
                     </h3>

                     {editingStoryId && (
                       <div className="flex items-center gap-2 bg-saffron/10 rounded-lg px-4 py-3">
                         <span className="font-poppins text-sm text-forest flex-1">Editing: <strong>{storyName}</strong></span>
                         <button type="button" onClick={() => { setEditingStoryId(null); setStoryName(''); setStoryBatch(''); setStoryText(''); setStoryError(''); }} className="font-poppins text-xs text-red-500 hover:text-red-600 font-medium uppercase tracking-wider">Cancel</button>
                       </div>
                     )}

                     <form onSubmit={handleAddStory} className="space-y-4">
                      <div>
                        <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Alumni Name</label>
                        <input type="text" value={storyName} onChange={(e) => setStoryName(e.target.value)} placeholder="e.g. Mr. Rahul Sharma"
                          className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors" required />
                      </div>
                      <div>
                        <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Batch / Year</label>
                        <input type="text" value={storyBatch} onChange={(e) => setStoryBatch(e.target.value)} placeholder="e.g. Batch of 2015"
                          className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors" />
                      </div>
                      <div>
                        <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Story</label>
                        <textarea value={storyText} onChange={(e) => setStoryText(e.target.value)} rows={6} placeholder="Write the success story here..."
                          className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors resize-none" required />
                      </div>

                      {storySuccess && <p className="font-poppins text-sm text-green-600 bg-green-50 rounded-lg py-2 px-4">{storySuccess}</p>}
                      {storyError && <p className="font-poppins text-sm text-red-500 bg-red-50 rounded-lg py-2 px-4">{storyError}</p>}

                      <button type="submit" disabled={storyUploading} className="w-full py-3 bg-saffron text-forest font-poppins font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-saffron-deep transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                        {storyUploading ? 'Saving...' : (editingStoryId ? 'Update Success Story' : 'Add Success Story')}
                      </button>
                    </form>

                    {stories.length > 0 && (
                      <div>
                        <h4 className="font-poppins text-sm font-semibold text-forest mb-4">Success Stories ({stories.length})</h4>
                        <div className="space-y-3">
                          {stories.map((item) => (
                            <div key={item.id} className="flex items-start justify-between gap-4 p-4 bg-ivory rounded-xl border border-forest/10">
                              <div className="min-w-0">
                                <p className="font-poppins text-sm font-medium text-forest">{item.name}</p>
                                {item.batch && <p className="font-poppins text-xs text-forest/50">{item.batch}</p>}
                                <p className="font-poppins text-xs text-forest/40 mt-1 line-clamp-2">{item.story}</p>
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <button onClick={() => handleDeleteStory(item.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                  <Trash2 size={16} />
                                </button>
                                <button onClick={() => handleEditStory(item)} className="p-2 text-saffron hover:text-saffron-deep hover:bg-saffron/10 rounded-lg transition-colors">
                                  <Edit3 size={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {activeTab === 'disclosure-links' && <DisclosureLinksAdmin />}
                {activeTab === 'achievements' && (
                  <div className="space-y-8">
                    <h3 className="font-playfair text-xl text-forest font-bold flex items-center gap-2">
                      <Trophy size={20} className="text-saffron" /> {editingAchievementId ? 'Edit Achievement' : 'Add Achievement'}
                    </h3>

                    {editingAchievementId && (
                      <div className="flex items-center gap-2 bg-saffron/10 rounded-lg px-4 py-3">
                        <span className="font-poppins text-sm text-forest flex-1">Editing: <strong>{achievementTitle}</strong></span>
                        <button type="button" onClick={() => { setEditingAchievementId(null); setAchievementTitle(''); setAchievementDesc(''); setAchievementImageFile(null); setAchievementImagePreview(''); setAchievementError(''); }} className="font-poppins text-xs text-red-500 hover:text-red-600 font-medium uppercase tracking-wider">Cancel</button>
                      </div>
                    )}

                    <form onSubmit={handleAddAchievement} className="space-y-4">
                      <div>
                        <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Title</label>
                        <input type="text" value={achievementTitle} onChange={(e) => setAchievementTitle(e.target.value)} placeholder="e.g. National-Level Excellence in Science"
                          className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors" required />
                      </div>
                      <div>
                        <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Description</label>
                        <textarea value={achievementDesc} onChange={(e) => setAchievementDesc(e.target.value)} rows={4} placeholder="Describe the achievement..."
                          className="w-full px-4 py-3 rounded-lg bg-ivory border border-forest/15 text-forest font-poppins text-sm placeholder-forest/30 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-colors resize-none" required />
                      </div>
                      <div>
                        <label className="font-poppins text-xs font-medium text-forest/70 uppercase tracking-wider block mb-2">Image</label>
                        <input ref={achievementFileRef} type="file" accept="image/*" onChange={handleAchievementFileSelect} className="hidden" />
                        <button type="button" onClick={() => achievementFileRef.current?.click()}
                          className="w-full px-4 py-3 rounded-lg border border-dashed border-forest/20 text-forest/50 font-poppins text-sm hover:border-saffron hover:text-saffron transition-colors">
                          {achievementImagePreview ? 'Change Image' : 'Choose Image (optional, max 2MB)'}
                        </button>
                        {achievementImagePreview && (
                          <div className="mt-3 relative inline-block">
                            <img src={achievementImagePreview} alt="Preview" className="h-24 rounded-lg object-cover" />
                            <button type="button" onClick={() => { setAchievementImageFile(null); setAchievementImagePreview(''); if (achievementFileRef.current) achievementFileRef.current.value = ''; }}
                              className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">×</button>
                          </div>
                        )}
                      </div>

                      {achievementSuccess && <p className="font-poppins text-sm text-green-600 bg-green-50 rounded-lg py-2 px-4">{achievementSuccess}</p>}
                      {achievementError && <p className="font-poppins text-sm text-red-500 bg-red-50 rounded-lg py-2 px-4">{achievementError}</p>}

                      <button type="submit" disabled={achievementUploading} className="w-full py-3 bg-saffron text-forest font-poppins font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-saffron-deep transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                        {achievementUploading ? 'Saving...' : (editingAchievementId ? 'Update Achievement' : 'Add Achievement')}
                      </button>
                    </form>

                    {achievementsList.length > 0 && (
                      <div>
                        <h4 className="font-poppins text-sm font-semibold text-forest mb-4">Achievements ({achievementsList.length})</h4>
                        <div className="space-y-3">
                          {achievementsList.map((item) => (
                            <div key={item.id} className="flex items-start justify-between gap-4 p-4 bg-ivory rounded-xl border border-forest/10">
                              <div className="min-w-0 flex items-start gap-3">
                                {item.image_url && (
                                  <img src={item.image_url} alt={item.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                                )}
                                <div className="min-w-0">
                                  <p className="font-poppins text-sm font-medium text-forest">{item.title}</p>
                                  <p className="font-poppins text-xs text-forest/40 mt-1 line-clamp-2">{item.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <button onClick={() => handleDeleteAchievement(item.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                  <Trash2 size={16} />
                                </button>
                                <button onClick={() => handleEditAchievement(item)} className="p-2 text-saffron hover:text-saffron-deep hover:bg-saffron/10 rounded-lg transition-colors">
                                  <Edit3 size={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {activeTab === 'change-password' && (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-saffron/10 flex items-center justify-center">
                      <Lock size={32} className="text-saffron" />
                    </div>
                    <h3 className="font-poppins text-xl font-semibold text-forest mb-2">Change Password</h3>
                    <p className="font-poppins text-sm text-forest/60 mb-6">
                      A reset link will be sent to your registered email.
                    </p>
                    <button
                      onClick={async () => {
                        setResetSent('sending');
                        const { data: { user } } = await supabase.auth.getUser();
                        if (!user?.email) { setResetSent('error'); return; }
                        const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
                          redirectTo: `${window.location.origin}/admin`,
                        });
                        setResetSent(error ? 'error' : 'sent');
                        if (!error) setTimeout(() => setResetSent('idle'), 5000);
                      }}
                      className="px-8 py-3 bg-saffron text-forest font-poppins text-sm font-semibold rounded-lg hover:bg-saffron-deep transition-colors"
                    >
                      {resetSent === 'sending' ? 'Sending...' : resetSent === 'sent' ? 'Reset Link Sent!' : 'Send Reset Link'}
                    </button>
                    {resetSent === 'sent' && (
                      <p className="font-poppins text-sm text-green-600 mt-4">Check your email for the reset link.</p>
                    )}
                  </div>
                )}
            </>
          )}
        </div>
        </main>
      </div>

      {/* Confirm Reset Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowConfirm(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-saffron/10 flex items-center justify-center">
              <Lock size={28} className="text-saffron" />
            </div>
            <h3 className="font-poppins text-lg font-semibold text-forest mb-2">Change Password?</h3>
            <p className="font-poppins text-sm text-forest/60 mb-6">
              A reset link will be sent to your registered email.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 border border-forest/20 text-forest font-poppins text-sm rounded-lg hover:bg-forest/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  setShowConfirm(false);
                  setResetSent('sending');
                  const { data: { user } } = await supabase.auth.getUser();
                  if (!user?.email) { setResetSent('error'); return; }
                  const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
                    redirectTo: `${window.location.origin}/admin`,
                  });
                  setResetSent(error ? 'error' : 'sent');
                  if (!error) setTimeout(() => setResetSent('idle'), 5000);
                }}
                className="flex-1 py-3 bg-saffron text-forest font-poppins text-sm font-semibold rounded-lg hover:bg-saffron-deep transition-colors"
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
