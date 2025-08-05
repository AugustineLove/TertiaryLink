import { useState, useEffect } from 'react';
import universitiesData from '../data/universities.json';
import coursesData from '../data/courses.json';
import ambassadorsData from '../data/ambassadors.json';
import articlesData from '../data/articles.json';

export const useUniversities = (filters = {}) => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUniversities = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let filteredData = [...universitiesData];
        
        if (filters.region) {
          filteredData = filteredData.filter(uni => uni.region === filters.region);
        }
        
        if (filters.type) {
          filteredData = filteredData.filter(uni => uni.type === filters.type);
        }
        
        if (filters.course) {
          filteredData = filteredData.filter(uni => 
            uni.coursesOffered.some(course => 
              course.toLowerCase().includes(filters.course.toLowerCase())
            )
          );
        }
        
        if (filters.search) {
          filteredData = filteredData.filter(uni =>
            uni.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            uni.location.toLowerCase().includes(filters.search.toLowerCase())
          );
        }
        
        setUniversities(filteredData);
      } catch (err) {
        setError('Failed to fetch universities');
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, [filters]);

  return { universities, loading, error };
};

export const useCourses = (filters = {}) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let filteredData = [...coursesData];
        
        if (filters.category) {
          filteredData = filteredData.filter(course => course.category === filters.category);
        }
        
        if (filters.search) {
          filteredData = filteredData.filter(course =>
            course.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            course.description.toLowerCase().includes(filters.search.toLowerCase())
          );
        }
        
        setCourses(filteredData);
      } catch (err) {
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [filters]);

  return { courses, loading, error };
};

export const useAmbassadors = (filters = {}) => {
  const [ambassadors, setAmbassadors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAmbassadors = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let filteredData = [...ambassadorsData];
        
        if (filters.university) {
          filteredData = filteredData.filter(amb => amb.university === filters.university);
        }
        
        if (filters.course) {
          filteredData = filteredData.filter(amb => amb.course === filters.course);
        }
        
        if (filters.region) {
          filteredData = filteredData.filter(amb => amb.region === filters.region);
        }
        
        setAmbassadors(filteredData);
      } catch (err) {
        setError('Failed to fetch ambassadors');
      } finally {
        setLoading(false);
      }
    };

    fetchAmbassadors();
  }, [filters]);

  return { ambassadors, loading, error };
};

export const useArticles = (filters = {}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let filteredData = [...articlesData];
        
        if (filters.category) {
          filteredData = filteredData.filter(article => article.category === filters.category);
        }
        
        if (filters.featured) {
          filteredData = filteredData.filter(article => article.featured);
        }
        
        setArticles(filteredData);
      } catch (err) {
        setError('Failed to fetch articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [filters]);

  return { articles, loading, error };
};